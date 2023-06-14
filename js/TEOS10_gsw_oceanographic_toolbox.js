/**
* Gibbs SeaWater (GSW) Oceanographic Toolbox of TEOS-10 version 3.0 (C)
* This is as translation to JavaScript from the PHP code by 
* Susanne Feistel.
* Author: E. Garcia-Ladona, ICM-CSIC
* Contact: emilio@icm.csic.es
*
* The original notices follow.
*
* Gibbs SeaWater (GSW) Oceanographic Toolbox of TEOS-10 version 3.0 (C)
* This is as translation of the C-translation into PHP for web-based applications.
* The original notices follow.
* Translation by Susanne Feistel, IOW 2013, 
* Contact: susanne.feistel@io-warnemuende.de
**/

/**
**  Id: gsw_oceanographic_toolbox.c,v 0932b7fe7c1e 2011/10/03 15:37:40 fdelahoyde 
**
**  This is a translation of the original f90 source code into C
**  by the Shipboard Technical Support Computing Resources group
**  at Scripps Institution of Oceanography -- sts-cr@sio.ucsd.edu.
**  The original notices follow.
**
**/

/**
!==========================================================================
! Gibbs SeaWater (GSW) Oceanographic Toolbox of TEOS-10 version 3.0 (Fortran)
!==========================================================================
!
! This is a subset of functions contained in the Gibbs SeaWater (GSW) 
! Oceanographic Toolbox of TEOS-10 (version 3.0).
! 
! salinity and temperature conversions
! gsw_sa_from_sp          - Absolute Salinity from Practical Salinity
! gsw_sstar_from_sp       - Preformed Salinity from Practical Salinity
! gsw_ct_from_t           - Conservative Temperature from in-situ temperature
!
! gsw_deltasa_from_sp     - Absolute Salinity Anomaly from Practical Salinity
! gsw_sr_from_sp          - Reference Salinity from Practical Salinity
! gsw_sp_from_sr          - Practical Salinity from Reference Salinity
! gsw_sp_from_sa          - Practical Salinity from Absolute Salinity
! gsw_sstar_from_sa       - Preformed Salinity from Absolute Salinity
! gsw_sp_from_sstar       - Practical Salinity from Preformed Salinity
! gsw_sa_from_sstar       - Absolute Salinity from Preformed Salinity
! gsw_ct_from_pt          - Conservative Temperature from potential temperature
! gsw_pt_from_ct          - potential temperature from Conservative Temperature
! gsw_pt0_from_t          - potential temperature with reference pressure of 0 dbar
! gsw_pt_from_t           - potential temperature 
!
! density and enthalpy, based on the 48-term expression for density
! gsw_rho                 - in-situ density from CT, and potential density
! gsw_alpha               - thermal expansion coefficient with respect to CT
! gsw_beta                - saline contraction coefficient at constant CT
! gsw_specvol             - specific volume
! gsw_specvol_anom        - specific volume anomaly
! gsw_sound_speed         - sound speed
! gsw_internal_energy     - internal energy
! gsw_enthalpy            - enthalpy
! gsw_dynamic_enthalpy    - dynamic enthalpy
!
! freezing temperatures
! gsw_ct_freezing         - Conservative Temperature freezing temperature of seawater
! gsw_t_freezing          - in-situ temperature freezing temperature of seawater
!
! isobaric melting enthalpy and isobaric evaporation enthalpy
! gsw_latentheat_melting  - latent heat of melting
! gsw_latentheat_evap_ct  - latent heat of evaporation
! gsw_latentheat_evap_t   - latent heat of evaporation
!
! basic thermodynamic properties in terms of in-situ t, based on the exact Gibbs function
! gsw_rho_t_exact         - in-situ density
! gsw_pot_rho_t_exact     - potential density
! gsw_alpha_wrt_t_exact   - thermal expansion coefficient with respect to in-situ temperature
! gsw_beta_const_t_exact  - saline contraction coefficient at constant in-situ temperature
! gsw_specvol_t_exact     - specific volume
! gsw_sound_speed_t_exact - sound speed
! gsw_kappa_t_exact       - isentropic compressibility
! gsw_enthalpy_t_exact    - enthalpy
! gsw_entropy_t_exact     - entropy
! gsw_cp_t_exact          - isobaric heat capacity
!
! Library functions of the GSW toolbox
! gsw_gibbs               - the TEOS-10 Gibbs function and its derivatives
! gsw_saar                - Absolute Salinity Anomaly Ratio (excluding the Baltic Sea)
! gsw_delta_sa_ref        - Absolute Salinity Anomaly ref. value (excluding the Baltic Sea)
! gsw_fdelta              - ratio of Absolute to Preformed Salinity, minus 1
! gsw_sa_from_sp_baltic   - Absolute Salinity Anomaly from Practical Salinity in the Baltic Sea
! gsw_sp_from_sa_baltic   - Practical Salinity from Absolute Salinity in the Baltic Sea
! gsw_entropy_part        - entropy minus the terms that are a function of only SA
! gsw_entropy_part_zerop  - entropy_part evaluated at 0 dbar
! gsw_gibbs_pt0_pt0       - gibbs(0,2,0,SA,t,0)
!
!
! Version 1.0 written by David Jackett
! Modified by Paul Barker (version 3.0)
!
! For help with this Oceanographic Toolbox email:- help_gsw@csiro.au
!
! This software is available from http://www.teos-10.org
!
!==========================================================================
*/

// Global variables
var GSW_INVALID_VALUE=9e15;

/*===========================================
 Function: TEOS10_gsw_oceanographic_toolbox ()
 Purpose: Constructor of TEOS10_gsw_oceanographic_toolbox
     In the following all the methods are 
     created using "prototype".
=============================================*/ 
function TEOS10_gsw_oceanographic_toolbox() {
	
	this.GSW_saar = new TEOS10_gsw_saar;
	
	// constants
	this.GSW_T0 = 273.15;    				// Celsius zero point, K
	this.GSW_P0 = 101325; 					// one standard atmosphere, Pa
	this.GSW_SSO = 35.16504; 				// Standard Ocean Reference Salinity, g/kg
	this.GSW_uPS = 1.00471542857142857143; // GSW_uPS = GSW_SSO / 35	
	this.GSW_cp0 = 3991.86795711963;		// the “specific heat” for use with CT; 3991.867 957 119 63 (J/kg)/K
	this.GSW_C3515 = 42.9140;			 	// conductivity of SSW at SP=35, t_68=15, p=0; 42.9140 mS/cm
	this.GSW_SonCl = 1.80655;				// ratio of SP to Chlorinity; 1.80655 (g/kg)-1
	this.GSW_valence_factor = 1.2452898;	// valence factor of sea salt; 1.2452898
	this.GSW_atomic_weight = 31.4038218; 	// mole-weighted atomic weight of sea salt; 31.4038218... g/mol
	
	this.db2pa	= 1e4;		/* factor to convert from dbar to Pa */
	this.p0 	= 101325e0;		

	this.a0	= -1.446013646344788e-2;    
	this.a1	= -3.305308995852924e-3;    
	this.a2	=  1.062415929128982e-4;     
	this.a3	=  9.477566673794488e-1;     
	this.a4	=  2.166591947736613e-3;
	this.a5	=  3.828842955039902e-3;
	
	this.a01 =  2.839940833161907e0;
	this.a02 = -6.295518531177023e-2;
	this.a03 =  3.545416635222918e-3;
	this.a04 = -2.986498947203215e-2;
	this.a05 =  4.655718814958324e-4;
	this.a06 =  5.095422573880500e-4;
	this.a07 = -2.853969343267241e-5;
	this.a08 =  4.935118121048767e-7;
	this.a09 = -3.436090079851880e-4;
	this.a10 =  7.452101440691467e-6;
	this.a11 =  6.876837219536232e-7;
	this.a12 = -1.988366587925593e-8;
	this.a13 = -2.123038140592916e-11;
	this.a14 =  2.775927747785646e-3;
	this.a15 = -4.699214888271850e-5;
	this.a16 =  3.358540072460230e-6;
	this.a17 =  2.697475730017109e-9;
	this.a18 = -2.764306979894411e-5;
	this.a19 =  2.525874630197091e-7;
	this.a20 =  2.858362524508931e-9;
	this.a21 = -7.244588807799565e-11;
	this.a22 =  3.801564588876298e-7;
	this.a23 = -1.534575373851809e-8;
	this.a24 = -1.390254702334843e-10;
	this.a25 =  1.072438894227657e-11;
	this.a26 = -3.212746477974189e-7;
	this.a27 =  6.382827821123254e-9;
	this.a28 = -5.793038794625329e-12;
	this.a29 =  6.211426728363857e-10;
	this.a30 = -1.941660213148725e-11;
	this.a31 = -3.729652850731201e-14;
	this.a32 =  1.119522344879478e-14;
	this.a33 =  6.057902487546866e-17;

	this.b0	=  1.000000000000000e0;
	this.b1	=  6.506097115635800e-4;
	this.b2	=  3.830289486850898e-3;
	this.b3	=  1.247811760368034e-6;	
	
	this.b01 = -6.698001071123802e0;
	this.b02 = -2.986498947203215e-2;
	this.b03 =  2.327859407479162e-4;
	this.b04 = -5.983233568452735e-2;
	this.b05 =  7.643133860820750e-4;
	this.b06 = -2.140477007450431e-5;
	this.b07 =  2.467559060524383e-7;
	this.b08 = -1.806789763745328e-4;
	this.b09 =  6.876837219536232e-7;
	this.b10 =  1.550932729220080e-10;
	this.b11 = -7.521448093615448e-3;
	this.b12 = -2.764306979894411e-5;
	this.b13 =  1.262937315098546e-7;
	this.b14 =  9.527875081696435e-10;
	this.b15 = -1.811147201949891e-11;
	this.b16 = -4.954963307079632e-5;
	this.b17 =  5.702346883314446e-7;
	this.b18 = -1.150931530388857e-8;
	this.b19 = -6.951273511674217e-11;
	this.b20 =  4.021645853353715e-12;
	this.b21 =  1.083865310229748e-5;
	this.b22 = -1.105097577149576e-7;
	this.b23 =  6.211426728363857e-10;
	this.b24 =  1.119522344879478e-14;
	
	this.c01 = -2.233269627352527e-2;
	this.c02 = -3.436090079851880e-4;
	this.c03 =  3.726050720345733e-6;
	this.c04 = -1.806789763745328e-4;
	this.c05 =  6.876837219536232e-7;
	this.c06 = -6.174065000748422e-7;
	this.c07 = -3.976733175851186e-8;
	this.c08 = -2.123038140592916e-11;
	this.c09 =  3.101865458440160e-10;
	this.c10 = -2.742185394906099e-5;
	this.c11 = -3.212746477974189e-7;
	this.c12 =  3.191413910561627e-9;
	this.c13 = -1.931012931541776e-12;
	this.c14 = -1.105097577149576e-7;
	this.c15 =  6.211426728363857e-10;
	this.c16 = -2.238023185750219e-10;
	this.c17 = -3.883320426297450e-11;
	this.c18 = -3.729652850731201e-14;
	this.c19 =  2.239044689758956e-14;
	this.c20 = -3.601523245654798e-15;
	this.c21 =  1.817370746264060e-16;
   
	this.v01 = 9.998420897506056e+2;
	this.v02 =  2.839940833161907e0;
	this.v03 = -3.147759265588511e-2;
	this.v04 =  1.181805545074306e-3;
	this.v05 = -6.698001071123802e0;
	this.v06 = -2.986498947203215e-2;
	this.v07 =  2.327859407479162e-4;
	this.v08 = -3.988822378968490e-2;
	this.v09 =  5.095422573880500e-4;
	this.v10 = -1.426984671633621e-5;
	this.v11 =  1.645039373682922e-7;
	this.v12 = -2.233269627352527e-2;
	this.v13 = -3.436090079851880e-4;
	this.v14 =  3.726050720345733e-6;
	this.v15 = -1.806789763745328e-4;
	this.v16 =  6.876837219536232e-7;
	this.v17 = -3.087032500374211e-7;
	this.v18 = -1.988366587925593e-8;
	this.v19 = -1.061519070296458e-11;
	this.v20 =  1.550932729220080e-10;
	this.v21 =  1.0e0;
	this.v22 =  2.775927747785646e-3;
	this.v23 = -2.349607444135925e-5;
	this.v24 =  1.119513357486743e-6;
	this.v25 =  6.743689325042773e-10;
	this.v26 = -7.521448093615448e-3;
	this.v27 = -2.764306979894411e-5;
	this.v28 =  1.262937315098546e-7;
	this.v29 =  9.527875081696435e-10;
	this.v30 = -1.811147201949891e-11;
	this.v31 = -3.303308871386421e-5;
	this.v32 =  3.801564588876298e-7;
	this.v33 = -7.672876869259043e-9;
	this.v34 = -4.634182341116144e-11;
	this.v35 =  2.681097235569143e-12;
	this.v36 =  5.419326551148740e-6;
	this.v37 = -2.742185394906099e-5;
	this.v38 = -3.212746477974189e-7;
	this.v39 =  3.191413910561627e-9;
	this.v40 = -1.931012931541776e-12;
	this.v41 = -1.105097577149576e-7;
	this.v42 =  6.211426728363857e-10;
	this.v43 = -1.119011592875110e-10;
	this.v44 = -1.941660213148725e-11;
	this.v45 = -1.864826425365600e-14;
	this.v46 =  1.119522344879478e-14;
	this.v47 = -1.200507748551599e-15;
	this.v48 =  6.057902487546866e-17;
}
//#--------------------------------------------------------------------------
//# METHODS: salinity and temperature conversions
//#--------------------------------------------------------------------------

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sa_from_sp = function(sp, p, lon, lat) {

		var saar = this.GSW_saar.gsw_saar(p,lon,lat);
		
		if (saar == GSW_INVALID_VALUE)
			return saar;
			
		var gsw_sa_baltic = this.gsw_sa_from_sp_baltic(sp,lon,lat);
		
		if (gsw_sa_baltic < 1e10)
			return gsw_sa_baltic;
		
		return (35.16504e0/35.0e0)*sp*(1.0e0 + saar);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sstar_from_sp = function(sp, p, lon, lat)	{
	
		var saar = this.GSW_saar.gsw_saar(p,lon,lat);
		if (saar == GSW_INVALID_VALUE)
		    return saar;
	    
		// !In the Baltic Sea, Sstar = SA.
	    
		var sstar_baltic	= this.gsw_sa_from_sp_baltic(sp,lon,lat);
		if (sstar_baltic < 1e10)
		    return sstar_baltic;
		return (35.16504e0/35.0e0)*sp*(1 - 0.35e0*saar);
	}
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_ct_from_t = function(sa, t, p) {
		//var pt0 = '';

		var pt0 = this.gsw_pt0_from_t(sa,t,p);
		// console.log(sa,t,p)
		return this.gsw_ct_from_pt(sa,pt0);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_deltasa_from_sp = function(sp, p, lon, lat) {

		var res	= this.gsw_sa_from_sp(sp,p,lon,lat) - this.gsw_sr_from_sp(sp);
		if (res > 1e10)
		    res = GSW_INVALID_VALUE;
		return res;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sr_from_sp = function(sp) {

		var res	= 1.004715428571429e0*sp;
		if (res >= 1.0e10)
		    res = 9.0e15;
		return res;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sp_from_sr = function(sr) {
	
		var res	= 0.995306702338459e0*sr;
		if (res > 1e10)
		    res	= GSW_INVALID_VALUE;
		return res;
	}
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sp_from_sa = function(sa, p, lon, lat) {

		var saar = this.GSW_saar.gsw_saar(p,lon,lat);
		if (saar == GSW_INVALID_VALUE)
		    return saar;
			
		var gsw_sp_baltic	= this.gsw_sp_from_sa_baltic(sa,lon,lat);
		if (gsw_sp_baltic < 1e10)
		    return gsw_sp_baltic;
			
		return (35.0e0/35.16504e0)*sa/(1.0e0 + saar);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sstar_from_sa = function(sa, p, lon, lat) {

		var saar = this.GSW_saar.gsw_saar(p,lon,lat);
	    /**
		* In the Baltic Sea, Sstar = sa, and note that gsw_saar returns zero
		* for saar in the Baltic.
	    */
		if (saar == GSW_INVALID_VALUE)
		    return saar;
		return sa*(1e0 - 0.35e0*saar)/(1e0 + saar);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sa_from_sstar = function(sstar, p, lon, lat) {

		var saar = this.GSW_saar.gsw_saar(p,lon,lat);
		if (saar == GSW_INVALID_VALUE)
		    return saar;
	    /*
	    **! In the Baltic Sea, Sstar = SA, and note that gsw_saar returns zero
	    **! for SAAR in the Baltic.
	    */
		return sstar*(1e0 + saar)/(1e0 - 0.35e0*saar);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sp_from_sstar = function(sstar, p, lon, lat) {

		var saar = this.GSW_saar.gsw_saar(p,lon,lat);
		if (saar == GSW_INVALID_VALUE)
		    return saar;

	    /**! In the Baltic Sea, SA = Sstar */

		var sp_baltic	= this.gsw_sp_from_sa_baltic(sstar,lon,lat);
		if (sp_baltic < 1810)
		    return sp_baltic;
		return (35.0e0/35.16504e0)*sstar/(1 - 0.35e0*saar);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_t_from_ct = function(sa, ct, p) {
		var p0 = 0.0e0;
		var pt0 = this.gsw_pt_from_ct(sa,ct);
		return this.gsw_pt_from_t(sa,pt0,p0,p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_ct_from_pt = function(sa, pt) {

		var sfac	= 0.0248826675584615e0;
		var x2		= sfac*sa;
		var x		= Math.sqrt(x2);
		var y		= pt * 0.025e0;	      /*! normalize for F03 and F08 */
		var pot_enthalpy	=  61.01362420681071e0 + y*(168776.46138048015e0 +
	             y*(-2735.2785605119625e0 + y*(2574.2164453821433e0 +
	             y*(-1536.6644434977543e0 + y*(545.7340497931629e0 +
	             (-50.91091728474331e0 - 18.30489878927802e0*y)*y))))) +
	             x2*(268.5520265845071e0 + y*(-12019.028203559312e0 +
	             y*(3734.858026725145e0 + y*(-2046.7671145057618e0 +
	             y*(465.28655623826234e0 + (-0.6370820302376359e0 -
	             10.650848542359153e0*y)*y)))) +
	             x*(937.2099110620707e0 + y*(588.1802812170108e0+
	             y*(248.39476522971285e0 + (-3.871557904936333e0-
	             2.6268019854268356e0*y)*y)) +
	             x*(-1687.914374187449e0 + x*(246.9598888781377e0 +
	             x*(123.59576582457964e0 - 48.5891069025409e0*x)) +
	             y*(936.3206544460336e0 +
	             y*(-942.7827304544439e0 + y*(369.4389437509002e0 +
	             (-33.83664947895248e0 - 9.987880382780322e0*y)*y))))));

		var cp0 = this.GSW_cp0;
		
		return pot_enthalpy/cp0;
	}
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_pt_from_t = function(sa, t, p, p_ref) {
	
		var n0	= 0;     var n2	= 2;
		var pt_old = ''; var ptm = '';
		var dentropy = '';
		var cp0= this.GSW_cp0;
		var sso= this.GSW_SSO;
		var s1	= sa*35e0/sso;
		var pt	= t+(p-p_ref)*( 8.65483913395442e-6  -
			  s1 *  1.41636299744881e-6  -
			  (p+p_ref) *  7.38286467135737e-9  +
			  t  *(-8.38241357039698e-6  +
			  s1 *  2.83933368585534e-8  +
			  t  *  1.77803965218656e-8  +
			  (p+p_ref) *  1.71155619208233e-10));

		var dentropy_dt	= cp0/((273.15e0 + pt)*(1e0-0.05e0*(1e0 - sa/sso)));
	  var true_entropy_part = this.gsw_entropy_part(sa,t,p);
		for (var no_iter=1; no_iter <= 2; no_iter++) {
		    pt_old		= pt;
		    dentropy	= this.gsw_entropy_part(sa,pt_old,p_ref) - true_entropy_part;
		    pt			= pt_old - dentropy/dentropy_dt;
		    ptm		= 0.5e0*(pt + pt_old);
		    dentropy_dt= -1* this.gsw_gibbs(n0,n2,n0,sa,ptm,p_ref);
		    ptt			= pt_old - dentropy/dentropy_dt;
		}
		return pt;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_pt0_from_t = function(sa, t, p) {
		 
		var n0	= 0; 	var n2	= 2;
		var pt0_old = '';  var pt0m = ''; var dentropy = '';
		
		var cp0	= this.GSW_cp0;
		var sso	= this.GSW_SSO;
       
		var s1	= sa*35e0/sso;

		var pt0	= t+p*( 8.65483913395442e-6  -
        		  s1 * 1.41636299744881e-6  -
			   	  p * 7.38286467135737e-9  +
			   	  t * (-8.38241357039698e-6  +
			 	  s1 * 2.83933368585534e-8  +
			   	  t * 1.77803965218656e-8  +
			   	  p * 1.71155619208233e-10));

		var dentropy_dt		= cp0/((273.15e0 + pt0)*(1e0-0.05e0*(1e0 - sa/sso)));
		var true_entropy_part	= this.gsw_entropy_part(sa,t,p);

		for (var no_iter=1; no_iter <= 2; no_iter++) {
			pt0_old	= pt0;
			dentropy	= this.gsw_entropy_part_zerop(sa,pt0_old) - true_entropy_part;
			pt0		= pt0_old - dentropy/dentropy_dt;
			pt0m		= 0.5e0*(pt0 + pt0_old);
			dentropy_dt= -1 * this.gsw_gibbs_pt0_pt0(sa,pt0m);
			pt0		= pt0_old - dentropy/dentropy_dt;
		}
		return pt0;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_pt_from_ct = function(sa, ct) {

		var cp0	= this.GSW_cp0;

		var n0 = 0;   var n2 = 2;

		var s1	= sa*35.0e0/35.16504e0;
		var p0	= 0.0e0;

		var a5ct = this.a5 * ct;
		var b3ct = this.b3 * ct;
		
		var ct_factor	= (this.a3 + this.a4* s1 + a5ct);
		var pt_num	= this.a0 + s1*(this.a1 + this.a2*s1) + ct*ct_factor;
		var pt_den	= this.b0 + this.b1*s1 + ct*(this.b2 + b3ct);
		var pt	        = (pt_num)/(pt_den);

		var dct_dpt	= (pt_den)/(ct_factor + a5ct - (this.b2 + b3ct + b3ct)*pt);

	    /*
	    **  Start the 1.5 iterations through the modified Newton-Raphson
	    **  iterative method.
	    */

		var ct_diff = this.gsw_ct_from_pt(sa,pt) - ct;
		var pt_old  = pt;
		pt	    = pt_old - (ct_diff)/dct_dpt;
		var ptm	    = 0.5e0*(pt + pt_old);

		var dct_dpt = -1*(ptm + 273.15e0) * this.gsw_gibbs_pt0_pt0(sa,ptm)/cp0;

		pt	= pt_old - (ct_diff)/dct_dpt;
		ct_diff	= this.gsw_ct_from_pt(sa,pt) - ct;
		pt_old	= pt;
		
		return pt_old - (ct_diff)/dct_dpt;
	}
//# --------------------------------------------------------------------------
//#  density and enthalpy, based on the 48-term expression for density
//# --------------------------------------------------------------------------
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_rho = function(sa, ct, p) {

		var sqrtsa = Math.sqrt(sa);

		var v_hat_denominator	=
				this.v01 + ct*(this.v02 + ct*(this.v03 + this.v04*ct))  
				+ sa*(this.v05 + ct*(this.v06 + this.v07*ct) 
				+ sqrtsa*(this.v08 + ct*(this.v09 + ct*(this.v10 + this.v11*ct)))) 
				+ p*(this.v12 + ct*(this.v13 + this.v14*ct) + sa*(this.v15 + this.v16*ct) 
				+ p*(this.v17 + ct*(this.v18 + this.v19*ct) + this.v20*sa));

		var v_hat_numerator	=
				this.v21 + ct*(this.v22 + ct*(this.v23 + ct*(this.v24 + this.v25*ct))) 
				+ sa*(this.v26 + ct*(this.v27 + ct*(this.v28 + ct*(this.v29 + this.v30*ct)))
				+ this.v36*sa 
				+ sqrtsa*(this.v31 + ct*(this.v32 + ct*(this.v33 + ct*(this.v34+this.v35*ct)))))
				+ p*(this.v37 + ct*(this.v38 + ct*(this.v39 + this.v40*ct))  
				+ sa*(this.v41 + this.v42*ct) 
				+ p*(this.v43 + ct*(this.v44 + this.v45*ct + this.v46*sa) 
				+ p*(this.v47 + this.v48*ct)));

		return v_hat_denominator/v_hat_numerator;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_alpha = function(sa, ct, p) {

		var sqrtsa = Math.sqrt(sa);

		var v_hat_denominator = this.v01 + ct*(this.v02 + ct*(this.v03 + this.v04*ct))
							+ sa*(this.v05 + ct*(this.v06 + this.v07*ct)
							+ sqrtsa*(this.v08 + ct*(this.v09 + ct*(this.v10 + this.v11*ct))))
							+ p*(this.v12 + ct*(this.v13 + this.v14*ct) + sa*(this.v15 + this.v16*ct)
							+ p*(this.v17 + ct*(this.v18 + this.v19*ct) + this.v20*sa));

		var v_hat_numerator = this.v21 + ct*(this.v22 + ct*(this.v23 + ct*(this.v24 + this.v25*ct)))
							+ sa*(this.v26 + ct*(this.v27 + ct*(this.v28 + ct*(this.v29 + this.v30*ct))) + this.v36*sa
							+ sqrtsa*(this.v31 + ct*(this.v32 + ct*(this.v33 + ct*(this.v34 + this.v35*ct)))))
							+ p*(this.v37 + ct*(this.v38 + ct*(this.v39 + this.v40*ct))
							+ sa*(this.v41 + this.v42*ct)
							+ p*(this.v43 + ct*(this.v44 + this.v45*ct + this.v46*sa)
							+ p*(this.v47 + this.v48*ct)));
	       
		var spec_vol = v_hat_numerator/v_hat_denominator;

		var dvhatden_dct = this.a01 + ct*(this.a02 + this.a03*ct)
							+ sa*(this.a04 + this.a05*ct
							+ sqrtsa*(this.a06 + ct*(this.a07 + this.a08*ct)))
							+ p*(this.a09 + this.a10*ct + this.a11*sa
							+ p*(this.a12 + this.a13*ct));

		var dvhatnum_dct = this.a14 + ct*(this.a15 + ct*(this.a16 + this.a17*ct))
							+ sa*(this.a18 + ct*(this.a19 + ct*(this.a20 + this.a21*ct))
							+ sqrtsa*(this.a22 + ct*(this.a23 + ct*(this.a24 + this.a25*ct))))
							+ p*(this.a26 + ct*(this.a27 + this.a28*ct) + this.a29*sa
							+ p*(this.a30 + this.a31*ct + this.a32*sa + this.a33*p));
	 
		return (dvhatnum_dct - dvhatden_dct*spec_vol)/v_hat_numerator;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_beta = function(sa, ct, p) {

		var sqrtsa = Math.sqrt(sa);

		var v_hat_denominator = this.v01 + ct*(this.v02 + ct*(this.v03 + this.v04*ct))
							+ sa*(this.v05 + ct*(this.v06 + this.v07*ct)
							+ sqrtsa*(this.v08 + ct*(this.v09 + ct*(this.v10 + this.v11*ct))))
							+ p*(this.v12 + ct*(this.v13 + this.v14*ct) + sa*(this.v15 + this.v16*ct)
							+ p*(this.v17 + ct*(this.v18 + this.v19*ct) + this.v20*sa));

		var v_hat_numerator = this.v21 + ct*(this.v22 + ct*(this.v23 + ct*(this.v24 + this.v25*ct)))
							+ sa*(this.v26 + ct*(this.v27 + ct*(this.v28 + ct*(this.v29 + this.v30*ct))) + this.v36*sa
							+ sqrtsa*(this.v31 + ct*(this.v32 + ct*(this.v33 + ct*(this.v34 + this.v35*ct)))))
							+ p*(this.v37 + ct*(this.v38 + ct*(this.v39 + this.v40*ct))
							+ sa*(this.v41 + this.v42*ct)
							+ p*(this.v43 + ct*(this.v44 + this.v45*ct + this.v46*sa)
							+ p*(this.v47 + this.v48*ct)));

		var spec_vol   = v_hat_numerator/v_hat_denominator;

		var dvhatden_dsa = this.b01 + ct*(this.b02 + this.b03*ct)
				  		+ sqrtsa*(this.b04 + ct*(this.b05 + ct*(this.b06 + this.b07*ct)))
						+ p*(this.b08 + this.b09*ct + this.b10*p); 

		var dvhatnum_dsa = this.b11 + ct*(this.b12 + ct*(this.b13 + ct*(this.b14 + this.b15*ct)))
				 	    + sqrtsa*(this.b16 + ct*(this.b17 + ct*(this.b18 + ct*(this.b19 + this.b20*ct))))
					    + this.b21*sa
					    + p*(this.b22 + ct*(this.b23 + this.b24*p));

		return (dvhatden_dsa * spec_vol - dvhatnum_dsa)/v_hat_numerator;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_specvol = function(sa, ct, p) {
		return 1e0/this.gsw_rho(sa,ct,p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_specvol_anom = function(sa, ct, p) {
		return this.gsw_specvol(sa,ct,p) - this.gsw_specvol_sso_0_p(p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sound_speed = function(sa, ct, p) {

		var sqrtsa = Math.sqrt(sa);

		var v_hat_denominator= this.v01 + ct*(this.v02 + ct*(this.v03 + this.v04*ct))
				+ sa*(this.v05 + ct*(this.v06 + this.v07*ct)
				+ sqrtsa*(this.v08 + ct*(this.v09 + ct*(this.v10 + this.v11*ct))))
				+ p*(this.v12 + ct*(this.v13 + this.v14*ct) + sa*(this.v15 + this.v16*ct)
				+ p*(this.v17 + ct*(this.v18 + this.v19*ct) + this.v20*sa));

		var v_hat_numerator	= this.v21 + ct*(this.v22 + ct*(this.v23 + ct*(this.v24 + this.v25*ct)))
				+ sa*(this.v26 + ct*(this.v27 + ct*(this.v28 + ct*(this.v29 + this.v30*ct))) + this.v36*sa
				+ sqrtsa*(this.v31 + ct*(this.v32 + ct*(this.v33 + ct*(this.v34 + this.v35*ct)))))
				+ p*(this.v37 + ct*(this.v38 + ct*(this.v39 + this.v40*ct))
				+ sa*(this.v41 + this.v42*ct)
				+ p*(this.v43 + ct*(this.v44 + this.v45*ct + this.v46*sa)
				+ p*(this.v47 + this.v48*ct)));

		var dvden_dp = this.c01 + ct*(this.c02 + this.c03*ct)
					+ sa*(this.c04 + this.c05*ct)
					+ p*(this.c06 + ct*(this.c07 + this.c08*ct) + this.c09*sa);

		var dvnum_dp = this.c10 + ct*(this.c11 + ct*(this.c12 + this.c13*ct))
					+ sa*(this.c14 + this.c15*ct)
					+ p*(this.c16 + ct*(this.c17 + this.c18*ct + this.c19*sa)
					+ p*(this.c20 + this.c21*ct));

		var dp_drho = (v_hat_numerator*v_hat_numerator)/ (dvden_dp*v_hat_numerator - dvnum_dp*v_hat_denominator);
	    
		return 100*Math.sqrt(dp_drho);
	}
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_internal_energy = function(sa, ct, p) {
		return this.gsw_enthalpy(sa,ct,p) - (this.p0 + this.db2pa*p)*this.gsw_specvol(sa,ct,p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_enthalpy = function(sa, ct, p) {

		var cp0	 = this.GSW_cp0;   /* from Eqn. (3.3.3) of IOC et al. (2010) */

		var sqrtsa = Math.sqrt(sa);

		var a0	= this.v21 + ct*(this.v22 + ct*(this.v23 + ct*(this.v24 + this.v25*ct)))
			 	+ sa*(this.v26 + ct*(this.v27 + ct*(this.v28 + ct*(this.v29 + this.v30*ct))) + this.v36*sa
				+ sqrtsa*(this.v31 + ct*(this.v32 + ct*(this.v33 + ct*(this.v34 + this.v35*ct)))));
	 	var a1	= this.v37 + ct*(this.v38 + ct*(this.v39 + this.v40*ct)) + sa*(this.v41 + this.v42*ct);

		var a2	= this.v43 + ct*(this.v44 + this.v45*ct + this.v46*sa);

		var a3	= this.v47 + this.v48*ct;

		var b0	= this.v01 + ct*(this.v02 + ct*(this.v03 + this.v04*ct))
			 	+ sa*(this.v05 + ct*(this.v06 + this.v07*ct)
				+ sqrtsa*(this.v08 + ct*(this.v09 + ct*(this.v10 + this.v11*ct))));
	 
		var b1	= 0.5e0*(this.v12 + ct*(this.v13 + this.v14*ct) + sa*(this.v15 + this.v16*ct));

		var b2	= this.v17 + ct*(this.v18 + this.v19*ct) + this.v20*sa;

		var b1sq = b1*b1;
		var sqrt_disc	= Math.sqrt(b1sq - b0*b2);

		var cn	= a0 + (2.0*a3*b0*b1/b2 - a2*b0)/b2;

		var cm	= a1 + (4.0*a3*b1sq/b2 - a3*b0 - 2*a2*b1)/b2;

		var ca	= b1 - sqrt_disc;
		var cb	= b1 + sqrt_disc;

		var part = (cn*b2 - cm*b1)/(b2*(cb - ca));

		return 	cp0*ct + this.db2pa*(p*(a2 - 2.0*a3*b1/b2 + 0.5*a3*p)/b2 +
				(cm/(2.0*b2))*Math.log(1 + p*(2.0*b1 + b2*p)/b0) +
				part*Math.log(1.0 + (b2*p*(cb - ca))/(ca*(cb + b2*p))));
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_dynamic_enthalpy = function(sa, ct, p) {

		var sqrtsa = Math.sqrt(sa);

		var a0	   = this.v21 + ct*(this.v22 + ct*(this.v23 + ct*(this.v24 + this.v25*ct)))
					+ sa*(this.v26 + ct*(this.v27 + ct*(this.v28 + ct*(this.v29 + this.v30*ct))) + this.v36*sa 
					+ sqrtsa*(this.v31 + ct*(this.v32 + ct*(this.v33 + ct*(this.v34 + this.v35*ct)))));
	 
		var a1	   = this.v37 + ct*(this.v38 + ct*(this.v39 + this.v40*ct)) + sa*(this.v41 + this.v42*ct);

		var a2	   = this.v43 + ct*(this.v44 + this.v45*ct + this.v46*sa);

		var a3	   = this.v47 + this.v48*ct;

		var b0     = this.v01 + ct*(this.v02 + ct*(this.v03 + this.v04*ct))
					+ sa*(this.v05 + ct*(this.v06 + this.v07*ct)
					+ sqrtsa*(this.v08 + ct*(this.v09 + ct*(this.v10 + this.v11*ct))));
	 
		var b1	   = 0.5e0*(this.v12 + ct*(this.v13 + this.v14*ct) + sa*(this.v15 + this.v16*ct));

		var b2	   = this.v17 + ct*(this.v18 + this.v19*ct) + this.v20*sa;

		var b1sq   = b1*b1;
		var sqrt_disc	= Math.sqrt(b1sq - b0*b2);

		var cn	= a0 + (2*a3*b0*b1/b2 - a2*b0)/b2;

		var cm	= a1 + (4*a3*b1sq/b2 - a3*b0 - 2*a2*b1)/b2;

		var ca	= b1 - sqrt_disc;
		var cb	= b1 + sqrt_disc;

		var part = (cn*b2 - cm*b1)/(b2*(cb - ca));

		return 	this.db2pa *(p*(a2 - 2.0*a3*b1/b2 + 0.5*a3*p)/b2
				+ (cm/(2.0*b2))*Math.log(1.0 + p*(2.0*b1 + b2*p)/b0)
				+ part*Math.log(1.0 + (b2*p*(cb - ca))/(ca*(cb + b2*p))));
	}

//--------------------------
//  freezing temperatures
//--------------------------
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_ct_freezing = function(sa, p, saturation_fraction) {
		var c0  = 0.017947064327968736e0; 	var c1  = -6.076099099929818e0;
		var c2  = 4.883198653547851e0; 	    var c3  = -11.88081601230542e0;
		var c4  = 13.34658511480257e0; 	    var c5  = -8.722761043208607e0;
		var c6  = 2.082038908808201e0; 	    var c7  = -7.389420998107497e0;
		var c8  = -2.110913185058476e0; 	var c9  = 0.2295491578006229e0;
		var c10 = -0.9891538123307282e0; 	var c11 = -0.08987150128406496e0;
		var c12 = 0.3831132432071728e0; 	var c13 = 1.054318231187074e0;
		var c14 = 1.065556599652796e0; 	    var c15 = -0.7997496801694032e0;
		var c16 = 0.3850133554097069e0; 	var c17 = -2.078616693017569e0;
		var c18 = 0.8756340772729538e0; 	var c19 = -2.079022768390933e0;
		var c20 = 1.596435439942262e0; 	    var c21 = 0.1338002171109174e0;
		var c22 = 1.242891021876471e0;

		var sa_r = sa*1e-2;
		var x	= Math.sqrt(sa_r);
		var p_r	= p*1e-4;

		var ct_freezing	= c0 + sa_r*(c1 + x*(c2 + x*(c3 + x*(c4 + x*(c5 + c6*x)))))
						+ p_r*(c7 + p_r*(c8 + c9*p_r))
						+ sa_r*p_r*(c10 + p_r*(c12 + p_r*(c15 + c21*sa_r))
						+ sa_r*(c13 + c17*p_r + c19*sa_r)
 						+ x*(c11 + p_r*(c14 + c18*p_r)
						+ sa_r*(c16 + c20*p_r + c22*sa_r)));
	    /*
	    ** Adjust for the effects of dissolved air 
	    */
		var a	= 0.014289763856964e0;	/* Note that a = 0.502500117621/35.16504. */
		var b	= 0.057000649899720e0;
		ct_freezing	= ct_freezing - saturation_fraction*(1e-3)
						*(2.4e0 - a*sa)*(1e0 + b*(1e0 - sa/35.16504e0));

		if (p > 10000e0  ||  sa > 120e0  || (p+sa*71.428571428571402e0) > 13571.42857142857e0)
		    ct_freezing	= GSW_INVALID_VALUE;

		return ct_freezing;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_t_freezing = function(sa, p, saturation_fraction) {

		var ct_freezing	= this.gsw_ct_freezing(sa,p,saturation_fraction);
		var t_freezing	= this.gsw_t_from_ct(sa,ct_freezing,p);

		if (ct_freezing > 9e10)
		    t_freezing	= GSW_INVALID_VALUE;

		return t_freezing;
	}
//--------------------------------------------------------------------------
// isobaric melting enthalpy and isobaric evaporation enthalpy
//--------------------------------------------------------------------------

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_latentheat_melting = function(sa, p) {
		var c0  =  3.334265169240710e5; var c1  = -2.789444646733159e0;
		var c2  = -1.822150156453350e4; var c3  = -4.984585692734338e3;
		var c4  = -7.371966528571920e1; var c5  = -7.605802553358546e3;
		var c6  =  1.195857305019339e3; var c7  =  1.233720336206392e3;
		var c8  =  2.294798676591890e2; var c9  =  9.655751370889338e2;
		var c10 = -5.792068522727968e2; var c11 = -1.649446955902331e3;
		var c12 = -1.029021448430547e3; var c13 = -3.171558017172501e2;
		var c14 = -1.751401389905041e2; var c15 =  6.836527214265952e2;
		var c16 =  1.078283734113611e3; var c17 =  5.613896351265648e2;
		var c18 =  6.968934948667265e2; var c19 =  1.793032021946783e2;
		var c20 =  8.692558481134256e1; var c21 = -2.371103254714944e2;
		var c22 = -5.775033277201674e2; var c23 = -3.019749254648732e2;
		var c24 = -6.420420579160927e2; var c25 = -2.657570848596042e2;
		var c26 = -1.646738151143109e1; var c27 =  4.618228988300871e0;

		var s_u	= 40e0*(35.16504e0/35e0);
		var x	= Math.sqrt(sa/s_u);
		var y	= p*1e-4;

		return c0 + x*(c1 + c4*y + x*(c3
			+ y*(c7 + c12*y) + x*(c6 + y*(c11 + y*(c17 + c24*y))
			+ x*(c10 + y*(c16 + c23*y) + x*(c15 + c22*y + c21*x)))))
			+ y*(c2 + y*(c5 + c8*x + y*(c9 + x*(c13 + c18*x)
			+ y*(c14 + x*(c19 + c25*x) + y*(c20 + c26*x + c27*y)))));
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_latentheat_evap_ct = function(sa, ct) {

		var c0  =  2.499065844825125e6; var c1  = -1.544590633515099e-1;
		var c2  = -9.096800915831875e4; var c3  =  1.665513670736000e2;
		var c4  =  4.589984751248335e1; var c5  =  1.894281502222415e1;
		var c6  =  1.192559661490269e3; var c7  = -6.631757848479068e3;
		var c8  = -1.104989199195898e2; var c9  = -1.207006482532330e3;
		var c10 = -3.148710097513822e3; var c11 =  7.437431482069087e2;
		var c12 =  2.519335841663499e3; var c13 =  1.186568375570869e1;
		var c14 =  5.731307337366114e2; var c15 =  1.213387273240204e3;
		var c16 =  1.062383995581363e3; var c17 = -6.399956483223386e2;
		var c18 = -1.541083032068263e3; var c19 =  8.460780175632090e1;
		var c20 = -3.233571307223379e2; var c21 = -2.031538422351553e2;
		var c22 =  4.351585544019463e1; var c23 = -8.062279018001309e2;
		var c24 =  7.510134932437941e2; var c25 =  1.797443329095446e2;
		var c26 = -2.389853928747630e1; var c27 =  1.021046205356775e2;

		var s_u	= 40e0*(35.16504e0/35e0);
		var x	= Math.sqrt(sa/s_u);
		var y	= ct/40;

		return c0 + x*(c1 + c4*y + x*(c3
				+ y*(c7 + c12*y) + x*(c6 + y*(c11 + y*(c17 + c24*y))
				+ x*(c10 + y*(c16 + c23*y) + x*(c15 + c22*y + c21*x)))))
				+ y*(c2 + y*(c5 + c8*x + y*(c9 + x*(c13 + c18*x)
				+ y*(c14 + x*(c19 + c25*x) + y*(c20 + c26*x + c27*y)))));
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_latentheat_evap_t = function(sa, t) {
		var ct = this.gsw_ct_from_pt(sa,t);
		return this.gsw_latentheat_evap_ct(sa,ct);
	}

//--------------------------------------------------------------------------
//  basic thermodynamic properties in terms of in-situ t, based on the exact Gibbs function
//--------------------------------------------------------------------------
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_rho_t_exact = function(sa, t, p) {
		var n0	= 0; var n1	= 1;
		return 1.0e0/this.gsw_gibbs(n0,n0,n1,sa,t,p);
	}
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_pot_rho_t_exact = function(sa, t, p, p_ref) {
		var pt = this.gsw_pt_from_t(sa,t,p,p_ref);
		return this.gsw_rho_t_exact(sa,pt,p_ref);
	}
 
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_alpha_wrt_t_exact = function(sa, t, p) {
		var n0	= 0;	var n1	= 1;
		return this.gsw_gibbs(n0,n1,n1,sa,t,p)/this.gsw_gibbs(n0,n0,n1,sa,t,p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_beta_const_t_exact = function(sa, t, p) {
		var n0	= 0; 	var n1	= 1;
		return -1 * this.gsw_gibbs(n1,n0,n1,sa,t,p)/this.gsw_gibbs(n0,n0,n1,sa,t,p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_specvol_t_exact = function(sa, t, p) {
		var n0	= 0; 	var n1	= 1;
		return this.gsw_gibbs(n0,n0,n1,sa,t,p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sound_speed_t_exact = function(sa, t, p) {

		var n0	= 0;	var n1	= 1;	var n2	= 2;

		var g_tt = this.gsw_gibbs(n0,n2,n0,sa,t,p);
		var g_tp = this.gsw_gibbs(n0,n1,n1,sa,t,p);

		return this.gsw_gibbs(n0,n0,n1,sa,t,p) *
			Math.sqrt(g_tt/(g_tp*g_tp - g_tt*this.gsw_gibbs(n0,n0,n2,sa,t,p)));
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_kappa_t_exact = function(sa, t, p) {

		var n0	= 0;	var n1	= 1;	var n2	= 2;
		
		var g_tt = this.gsw_gibbs(n0,n2,n0,sa,t,p);
		var g_tp = this.gsw_gibbs(n0,n1,n1,sa,t,p);

		return (g_tp*g_tp - g_tt*this.gsw_gibbs(n0,n0,n2,sa,t,p)) /
			(this.gsw_gibbs(n0,n0,n1,sa,t,p)*g_tt);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_enthalpy_t_exact = function(sa, t, p) {
		var n0	= 0;	var n1	= 1;
		return this.gsw_gibbs(n0,n0,n0,sa,t,p) -
			(t+273.15e0)*this.gsw_gibbs(n0,n1,n0,sa,t,p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_entropy_t_exact = function(sa, t, p) {
		var n0	= 0;	var n1	= 1;
		return -1 * this.gsw_gibbs(n0,n1,n0,sa,t,p);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_cp_t_exact = function(sa, t, p) {
		var n0	= 0;	var n2	= 2;
		return -1*(t+273.15e0)*this.gsw_gibbs(n0,n2,n0,sa,t,p);
	}

//------------------------------------------
//  Library functions of the GSW toolbox
//-----------------------------------------

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_gibbs = function(ns, nt, np, sa, t, p) {

		var sfac = 0.0248826675584615e0;
		var x2	= sfac*sa;  var x = Math.sqrt(x2);   
		var y = t*0.025e0;	var z = p*1e-4;

		if (ns == 0  && nt == 0  && np == 0) {
		    var g03	= 101.342743139674e0 + z*(100015.695367145e0 +
			z*(-2544.5765420363e0 + z*(284.517778446287e0 +
			z*(-33.3146754253611e0 + (4.20263108803084e0 -
			   0.546428511471039e0*z)*z)))) +
			y*(5.90578347909402e0 + z*(-270.983805184062e0 +
			z*(776.153611613101e0 + z*(-196.51255088122e0 +
			   (28.9796526294175e0 - 2.13290083518327e0*z)*z))) +
			y*(-12357.785933039e0 + z*(1455.0364540468e0 +
			z*(-756.558385769359e0 + z*(273.479662323528e0 +
			   z*(-55.5604063817218e0 + 4.34420671917197e0*z)))) +
			y*(736.741204151612e0 + z*(-672.50778314507e0 +
			z*(499.360390819152e0 + z*(-239.545330654412e0 +
			   (48.8012518593872e0 - 1.66307106208905e0*z)*z))) +
			y*(-148.185936433658e0 + z*(397.968445406972e0 +
			z*(-301.815380621876e0 + (152.196371733841e0 -
			   26.3748377232802e0*z)*z)) +
			y*(58.0259125842571e0 + z*(-194.618310617595e0 +
			z*(120.520654902025e0 + z*(-55.2723052340152e0 +
			   6.48190668077221e0*z))) +
			y*(-18.9843846514172e0 + y*(3.05081646487967e0 -
			   9.63108119393062e0*z) +
			z*(63.5113936641785e0 + z*(-22.2897317140459e0 +
			   8.17060541818112e0*z))))))));
	          
		    var g08	= x2*(1416.27648484197e0 + z*(-3310.49154044839e0 +
			z*(384.794152978599e0 + z*(-96.5324320107458e0 +
			   (15.8408172766824e0 - 2.62480156590992e0*z)*z))) +
			x*(-2432.14662381794e0 + x*(2025.80115603697e0 +
			y*(543.835333000098e0 + y*(-68.5572509204491e0 +
			y*(49.3667694856254e0 + y*(-17.1397577419788e0 +
			   2.49697009569508e0*y))) - 22.6683558512829e0*z) +
			x*(-1091.66841042967e0 - 196.028306689776e0*y +
			x*(374.60123787784e0 - 48.5891069025409e0*x +
			   36.7571622995805e0*y) + 36.0284195611086e0*z) +
			z*(-54.7919133532887e0 + (-4.08193978912261e0 -
			   30.1755111971161e0*z)*z)) +
			z*(199.459603073901e0 + z*(-52.2940909281335e0 +
			   (68.0444942726459e0 - 3.41251932441282e0*z)*z)) +
			y*(-493.407510141682e0 + z*(-175.292041186547e0 +
			   (83.1923927801819e0 - 29.483064349429e0*z)*z) +
			y*(-43.0664675978042e0 + z*(383.058066002476e0 +
			   z*(-54.1917262517112e0 + 25.6398487389914e0*z)) +
			y*(-10.0227370861875e0 - 460.319931801257e0*z +
			   y*(0.875600661808945e0 + 234.565187611355e0*z))))) +
			y*(168.072408311545e0 + z*(729.116529735046e0 +
			z*(-343.956902961561e0 + z*(124.687671116248e0 +
			   z*(-31.656964386073e0 + 7.04658803315449e0*z)))) +
			y*(880.031352997204e0 + y*(-225.267649263401e0 +
			y*(91.4260447751259e0 + y*(-21.6603240875311e0 +
			   2.13016970847183e0*y) +
			z*(-297.728741987187e0 + (74.726141138756e0 -
			   36.4872919001588e0*z)*z)) +
			z*(694.244814133268e0 + z*(-204.889641964903e0 +
			   (113.561697840594e0 - 11.1282734326413e0*z)*z))) +
			z*(-860.764303783977e0 + z*(337.409530269367e0 +
			z*(-178.314556207638e0 + (44.2040358308e0 -
			   7.92001547211682e0*z)*z))))));
	        
		    if (sa > 0.0e0)
				g08 = g08 + x2*(5812.81456626732e0 + 851.226734946706e0*y)*Math.log(x);

		    var return_value	= g03 + g08;
	  
		} else if (ns == 1  && nt == 0  && np == 0) {   
		 var g08	= 8645.36753595126e0 + z*(-6620.98308089678e0 +
			z*(769.588305957198e0 + z*(-193.0648640214916e0 +
			   (31.6816345533648e0 - 5.24960313181984e0*z)*z))) +
			x*(-7296.43987145382e0 + x*(8103.20462414788e0 +
			y*(2175.341332000392e0 + y*(-274.2290036817964e0 +
			y*(197.4670779425016e0 + y*(-68.5590309679152e0 +
			   9.98788038278032e0*y))) - 90.6734234051316e0*z) +
			x*(-5458.34205214835e0 - 980.14153344888e0*y +
			x*(2247.60742726704e0 - 340.1237483177863e0*x +
			   220.542973797483e0*y) + 180.142097805543e0*z) +
			z*(-219.1676534131548e0 + (-16.32775915649044e0 -
			   120.7020447884644e0*z)*z)) +
			z*(598.378809221703e0 + z*(-156.8822727844005e0 +
			   (204.1334828179377e0 - 10.23755797323846e0*z)*z)) +
			y*(-1480.222530425046e0 + z*(-525.876123559641e0 +
			   (249.57717834054571e0 - 88.449193048287e0*z)*z) +
			y*(-129.1994027934126e0 + z*(1149.174198007428e0 +
			   z*(-162.5751787551336e0 + 76.9195462169742e0*z)) +
			y*(-30.0682112585625e0 - 1380.9597954037708e0*z +
			   y*(2.626801985426835e0 + 703.695562834065e0*z))))) +
			y*(1187.3715515697959e0 + z*(1458.233059470092e0 +
			z*(-687.913805923122e0 + z*(249.375342232496e0 +
			   z*(-63.313928772146e0 + 14.09317606630898e0*z)))) +
			y*(1760.062705994408e0 + y*(-450.535298526802e0 +
			y*(182.8520895502518e0 + y*(-43.3206481750622e0 +
			   4.26033941694366e0*y) +
			z*(-595.457483974374e0 + (149.452282277512e0 -
			   72.9745838003176e0*z)*z)) +
			z*(1388.489628266536e0 + z*(-409.779283929806e0 +
			   (227.123395681188e0 - 22.2565468652826e0*z)*z))) +
			z*(-1721.528607567954e0 + z*(674.819060538734e0 +
			z*(-356.629112415276e0 + (88.4080716616e0 -
			   15.84003094423364e0*z)*z)))));
	  
		    if (sa > 0.0e0)
			g08 = g08 + (11625.62913253464e0 + 1702.453469893412e0*y)*Math.log(x);
		    else
			g08 = 0.0e0;
	  
		    var return_value = 0.5*sfac*g08;

		} else if (ns == 0  && nt == 1  && np == 0) {
		    var g03	= 5.90578347909402e0 + z*(-270.983805184062e0 +
			z*(776.153611613101e0 + z*(-196.51255088122e0 +
			   (28.9796526294175e0 - 2.13290083518327e0*z)*z))) +
			y*(-24715.571866078e0 + z*(2910.0729080936e0 +
			z*(-1513.116771538718e0 + z*(546.959324647056e0 +
			   z*(-111.1208127634436e0 + 8.68841343834394e0*z)))) +
			y*(2210.2236124548363e0 + z*(-2017.52334943521e0 +
			z*(1498.081172457456e0 + z*(-718.6359919632359e0 +
			   (146.4037555781616e0 - 4.9892131862671505e0*z)*z))) +
			y*(-592.743745734632e0 + z*(1591.873781627888e0 +
			z*(-1207.261522487504e0 + (608.785486935364e0 -
			   105.4993508931208e0*z)*z)) +
			y*(290.12956292128547e0 + z*(-973.091553087975e0 +
			z*(602.603274510125e0 + z*(-276.361526170076e0 +
			   32.40953340386105e0*z))) +
			y*(-113.90630790850321e0 + y*(21.35571525415769e0 -
			   67.41756835751434e0*z) +
			z*(381.06836198507096e0 + z*(-133.7383902842754e0 +
			   49.023632509086724e0*z)))))));
	              
		    var g08	= x2*(168.072408311545e0 + z*(729.116529735046e0 +
			z*(-343.956902961561e0 + z*(124.687671116248e0 +
			   z*(-31.656964386073e0 + 7.04658803315449e0*z)))) +
			x*(-493.407510141682e0 + x*(543.835333000098e0 +
			   x*(-196.028306689776e0 + 36.7571622995805e0*x) +
			y*(-137.1145018408982e0 + y*(148.10030845687618e0 +
			   y*(-68.5590309679152e0 + 12.4848504784754e0*y))) -
			   22.6683558512829e0*z) + z*(-175.292041186547e0 +
			   (83.1923927801819e0 - 29.483064349429e0*z)*z) +
			y*(-86.1329351956084e0 + z*(766.116132004952e0 +
			   z*(-108.3834525034224e0 + 51.2796974779828e0*z)) +
			y*(-30.0682112585625e0 - 1380.9597954037708e0*z +
			   y*(3.50240264723578e0 + 938.26075044542e0*z)))) +
			y*(1760.062705994408e0 + y*(-675.802947790203e0 +
			y*(365.7041791005036e0 + y*(-108.30162043765552e0 +
			   12.78101825083098e0*y) +
			z*(-1190.914967948748e0 + (298.904564555024e0 -
			   145.9491676006352e0*z)*z)) +
			z*(2082.7344423998043e0 + z*(-614.668925894709e0 +
			   (340.685093521782e0 - 33.3848202979239e0*z)*z))) +
			z*(-1721.528607567954e0 + z*(674.819060538734e0 +
			z*(-356.629112415276e0 + (88.4080716616e0 -
			   15.84003094423364e0*z)*z)))));
	      
		    if (sa > 0.00)
			g08	= g08 + 851.226734946706e0*x2*Math.log(x);
	  
		    var return_value	= (g03 + g08)*0.025e0;

		} else if (ns == 0  && nt == 0  && np == 1) {
		    var g03	= 100015.695367145e0 + z*(-5089.1530840726e0 +
			z*(853.5533353388611e0 + z*(-133.2587017014444e0 +
			   (21.0131554401542e0 - 3.278571068826234e0*z)*z))) +
			y*(-270.983805184062e0 + z*(1552.307223226202e0 +
			z*(-589.53765264366e0 + (115.91861051767e0 -
			   10.664504175916349e0*z)*z)) +
			y*(1455.0364540468e0 + z*(-1513.116771538718e0 +
			z*(820.438986970584e0 + z*(-222.2416255268872e0 +
			   21.72103359585985e0*z))) +
			y*(-672.50778314507e0 + z*(998.720781638304e0 +
			z*(-718.6359919632359e0 + (195.2050074375488e0 -
			   8.31535531044525e0*z)*z)) +
			y*(397.968445406972e0 + z*(-603.630761243752e0 +
			   (456.589115201523e0 - 105.4993508931208e0*z)*z) +
			y*(-194.618310617595e0 + y*(63.5113936641785e0 -
			   9.63108119393062e0*y +
			z*(-44.5794634280918e0 + 24.511816254543362e0*z)) +
			z*(241.04130980405e0 + z*(-165.8169157020456e0 +
			25.92762672308884e0*z)))))));
	  
		    var g08	= x2*(-3310.49154044839e0 + z*(769.588305957198e0 +
			z*(-289.5972960322374e0 + (63.3632691067296e0 -
			   13.1240078295496e0*z)*z)) +
			x*(199.459603073901e0 + x*(-54.7919133532887e0 +
			   36.0284195611086e0*x - 22.6683558512829e0*y +
			(-8.16387957824522e0 - 90.52653359134831e0*z)*z) +
			z*(-104.588181856267e0 + (204.1334828179377e0 -
			   13.65007729765128e0*z)*z) +
			y*(-175.292041186547e0 + (166.3847855603638e0 -
			   88.449193048287e0*z)*z +
			y*(383.058066002476e0 + y*(-460.319931801257e0 +
			   234.565187611355e0*y) +
			z*(-108.3834525034224e0 + 76.9195462169742e0*z)))) +
			y*(729.116529735046e0 + z*(-687.913805923122e0 +
			z*(374.063013348744e0 + z*(-126.627857544292e0 +
			   35.23294016577245e0*z))) +
			y*(-860.764303783977e0 + y*(694.244814133268e0 +
			y*(-297.728741987187e0 + (149.452282277512e0 -
			   109.46187570047641e0*z)*z) +
			z*(-409.779283929806e0 + (340.685093521782e0 -
			   44.5130937305652e0*z)*z)) +
			z*(674.819060538734e0 + z*(-534.943668622914e0 +
			   (176.8161433232e0 - 39.600077360584095e0*z)*z)))));
	     
		    var return_value = (g03 + g08)*1e-8;

		} else if (ns == 0  && nt == 2  && np == 0) {
		    var g03	= -24715.571866078e0 + z*(2910.0729080936e0 + z*
			(-1513.116771538718e0 + z*(546.959324647056e0 +
			 z*(-111.1208127634436e0 + 8.68841343834394e0*z)))) +
			y*(4420.4472249096725e0 + z*(-4035.04669887042e0 +
			z*(2996.162344914912e0 + z*(-1437.2719839264719e0 +
			   (292.8075111563232e0 - 9.978426372534301e0*z)*z))) +
			y*(-1778.231237203896e0 + z*(4775.621344883664e0 +
			z*(-3621.784567462512e0 + (1826.356460806092e0 -
			   316.49805267936244e0*z)*z)) +
			y*(1160.5182516851419e0 + z*(-3892.3662123519e0 +
			z*(2410.4130980405e0 + z*(-1105.446104680304e0 +
			   129.6381336154442e0*z))) +
			y*(-569.531539542516e0 + y*(128.13429152494615e0 -
			   404.50541014508605e0*z) +
			z*(1905.341809925355e0 + z*(-668.691951421377e0 +
			   245.11816254543362e0*z))))));

		    var g08	= x2*(1760.062705994408e0 + x*(-86.1329351956084e0 +
			x*(-137.1145018408982e0 + y*(296.20061691375236e0 +
			   y*(-205.67709290374563e0 + 49.9394019139016e0*y))) +
			z*(766.116132004952e0 + z*(-108.3834525034224e0 +
			   51.2796974779828e0*z)) +
			y*(-60.136422517125e0 - 2761.9195908075417e0*z +
			   y*(10.50720794170734e0 + 2814.78225133626e0*z))) +
			y*(-1351.605895580406e0 + y*(1097.1125373015109e0 +
			   y*(-433.20648175062206e0 + 63.905091254154904e0*y) +
			z*(-3572.7449038462437e0 + (896.713693665072e0 -
			   437.84750280190565e0*z)*z)) +
			z*(4165.4688847996085e0 + z*(-1229.337851789418e0 +
			   (681.370187043564e0 - 66.7696405958478e0*z)*z))) +
			z*(-1721.528607567954e0 + z*(674.819060538734e0 +
			z*(-356.629112415276e0 + (88.4080716616e0 -
			   15.84003094423364e0*z)*z))));
	     
		    var return_value	= (g03 + g08)*0.000625e0  ;

		} else if (ns == 1  && nt == 0  && np == 1) {
		    var g08	=     -6620.98308089678e0 + z*(1539.176611914396e0 +
			z*(-579.1945920644748e0 + (126.7265382134592e0 -
			   26.2480156590992e0*z)*z)) +
			x*(598.378809221703e0 + x*(-219.1676534131548e0 +
			   180.142097805543e0*x - 90.6734234051316e0*y +
			(-32.65551831298088e0 - 362.10613436539325e0*z)*z) +
			z*(-313.764545568801e0 + (612.4004484538132e0 -
			   40.95023189295384e0*z)*z) +
			y*(-525.876123559641e0 + (499.15435668109143e0 -
			   265.347579144861e0*z)*z +
			y*(1149.174198007428e0 + y*(-1380.9597954037708e0 +
			   703.695562834065e0*y) +
			z*(-325.1503575102672e0 + 230.7586386509226e0*z)))) +
			y*(1458.233059470092e0 + z*(-1375.827611846244e0 +
			z*(748.126026697488e0 + z*(-253.255715088584e0 +
			   70.4658803315449e0*z))) +
			y*(-1721.528607567954e0 + y*(1388.489628266536e0 +
			y*(-595.457483974374e0 + (298.904564555024e0 -
			   218.92375140095282e0*z)*z) +
			z*(-819.558567859612e0 + (681.370187043564e0 -
			   89.0261874611304e0*z)*z)) +
			z*(1349.638121077468e0 + z*(-1069.887337245828e0 +
			   (353.6322866464e0 - 79.20015472116819e0*z)*z))));    

		    var return_value = g08*sfac*0.5e-8;

		} else if (ns == 0  && nt == 1  && np == 1) {
		    var g03	= -270.983805184062e0 + z*(1552.307223226202e0 +
			z*(-589.53765264366e0 + (115.91861051767e0 -
			   10.664504175916349e0*z)*z)) +
			y*(2910.0729080936e0 + z*(-3026.233543077436e0 +
			z*(1640.877973941168e0 + z*(-444.4832510537744e0 +
			   43.4420671917197e0*z))) +
			y*(-2017.52334943521e0 + z*(2996.162344914912e0 +
			z*(-2155.907975889708e0 + (585.6150223126464e0 -
			   24.946065931335752e0*z)*z)) +
			y*(1591.873781627888e0 + z*(-2414.523044975008e0 +
			   (1826.356460806092e0 - 421.9974035724832e0*z)*z) +
			y*(-973.091553087975e0 + z*(1205.20654902025e0 +
			   z*(-829.084578510228e0 + 129.6381336154442e0*z)) +
			y*(381.06836198507096e0 - 67.41756835751434e0*y +
			   z*(-267.4767805685508e0 + 147.07089752726017e0*z))))));
	    
		    var g08	= x2*(729.116529735046e0 + z*(-687.913805923122e0 +
			z*(374.063013348744e0 + z*(-126.627857544292e0 +
			   35.23294016577245e0*z))) +
			x*(-175.292041186547e0 - 22.6683558512829e0*x +
			   (166.3847855603638e0 - 88.449193048287e0*z)*z +
			y*(766.116132004952e0 + y*(-1380.9597954037708e0 +
			   938.26075044542e0*y) +
			z*(-216.7669050068448e0 + 153.8390924339484e0*z))) +
			y*(-1721.528607567954e0 + y*(2082.7344423998043e0 +
			y*(-1190.914967948748e0 + (597.809129110048e0 -
			   437.84750280190565e0*z)*z) +
			z*(-1229.337851789418e0 + (1022.055280565346e0 -
			   133.5392811916956e0*z)*z)) +
			z*(1349.638121077468e0 + z*(-1069.887337245828e0 +
			   (353.6322866464e0 - 79.20015472116819e0*z)*z))));
	    
		    var return_value = (g03 + g08)*2.5e-10;

		} else if (ns == 0  && nt == 0  && np == 2) {
		    var g03	= -5089.1530840726e0 + z*(1707.1066706777221e0 +
			z*(-399.7761051043332e0 + (84.0526217606168e0 -
			   16.39285534413117e0*z)*z)) +
			y*(1552.307223226202e0 + z*(-1179.07530528732e0 +
			   (347.75583155301e0 - 42.658016703665396e0*z)*z) +
			y*(-1513.116771538718e0 + z*(1640.877973941168e0 +
			   z*(-666.7248765806615e0 + 86.8841343834394e0*z)) +
			y*(998.720781638304e0 + z*(-1437.2719839264719e0 +
			   (585.6150223126464e0 - 33.261421241781e0*z)*z) +
			y*(-603.630761243752e0 + (913.178230403046e0 -
			   316.49805267936244e0*z)*z +
			y*(241.04130980405e0 + y*(-44.5794634280918e0 +
			   49.023632509086724e0*z) +
			z*(-331.6338314040912e0 + 77.78288016926652e0*z))))));
	            
		    var g08	= x2*(769.588305957198e0 + z*(-579.1945920644748e0 +
			     (190.08980732018878e0 - 52.4960313181984e0*z)*z) +
			x*(-104.588181856267e0 + x*(-8.16387957824522e0 -
			   181.05306718269662e0*z) +
			(408.2669656358754e0 - 40.95023189295384e0*z)*z +
			y*(166.3847855603638e0 - 176.898386096574e0*z +
			   y*(-108.3834525034224e0 + 153.8390924339484e0*z))) +
			y*(-687.913805923122e0 + z*(748.126026697488e0 +
			   z*(-379.883572632876e0 + 140.9317606630898e0*z)) +
			y*(674.819060538734e0 + z*(-1069.887337245828e0 +
			   (530.4484299696e0 - 158.40030944233638e0*z)*z) +
			y*(-409.779283929806e0 + y*(149.452282277512e0 -
			   218.92375140095282e0*z) +
			(681.370187043564e0 - 133.5392811916956e0*z)*z))));
	    
		    var return_value = (g03 + g08)*1e-16 ;
		}

		return return_value;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_add_barrier = function(input, lon, lat, long_grid, lat_grid, dlong_grid, dlat_grid, output) {
		
		var above_line0 = '';
		var longs_pan = [260.0, 272.59, 276.50, 278.65, 280.73, 292.0];
		var lats_pan = [19.55, 13.97, 9.6, 8.1, 9.33, 3.4];
		
        var above_line = [];
		var k			= this.gsw_indx(longs_pan,6,lon);	/*   the lon/lat point */
		var r			= (lon-longs_pan[k])/(longs_pan[k+1]-longs_pan[k]);
		var lats_line	= lats_pan[k] + r*(lats_pan[k+1]-lats_pan[k]);

		lats_line <= lat ? above_line0 = 1 : above_line0 = 0;
		//# above_line0	= (lats_line <= lat);

		k			= this.gsw_indx(longs_pan,6,long_grid);	/* the 1 & 4 lon/lat points*/ 
		r			= (long_grid-longs_pan[k])/(longs_pan[k+1]-longs_pan[k]);
		lats_line	= lats_pan[k] + r*(lats_pan[k+1]-lats_pan[k]);

		above_line[0]	= (lats_line <= lat_grid);
		above_line[3]	= (lats_line <= lat_grid+dlat_grid);

		k				= this.gsw_indx(longs_pan,6,long_grid+dlong_grid);
						/*the 2 & 3 lon/lat points */
		r				= (long_grid + dlong_grid - longs_pan[k]) /	(longs_pan[k+1] - longs_pan[k]);
		lats_line		= lats_pan[k] + r * (lats_pan[k+1] - lats_pan[k]);

		above_line[1] = (lats_line <= lat_grid);
		above_line[2] = (lats_line <= lat_grid + dlat_grid);

		var nmean = 0;
		var data_mean = 0.0;

		for (var kk=0; kk<4; kk++) {
		    if ((Math.abs(input[kk]) <= 100.0) && above_line0 == above_line[kk]) {
				nmean = nmean+1;
				data_mean = data_mean + input[kk];
		    }
		}
		if (nmean == 0)
		    data_mean = 0.0;	/*errorreturn*/
		else
		    data_mean = data_mean / nmean;

		for (var kk=0; kk<4; kk++) {
		    if ((Math.abs(input[kk]) >= 1e10) || above_line0 != above_line[kk])
				output[kk] = data_mean;
		    else
				output[kk] = input[kk];
		}

		return;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_add_mean = function(data_in, lon, lat, data_out) {

		var nmean		= 0;
		var data_mean	= 0.0;

		for (var k=0; k<4; k++) {
		    if (Math.abs(data_in[k]) <= 100.0) {
				nmean++;
				data_mean = data_mean + data_in[k];
		    }
		}

		if (nmean == 0)
		    data_mean	= 0.0;    /*errorreturn*/
		else
		    data_mean	= data_mean / nmean;

		for (k=0; k<4; k++) {
		    if (Math.abs(data_in[k]) >= 100.0)
				data_out[k]	= data_mean;
		    else
				data_out[k]	= data_in[k];
		}
		return;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_xinterp1 = function(x, y, n, x0) {

		var k	= this.gsw_indx(x,n,x0);
		var r	= (x0-x[k])/(x[k+1]-x[k]);
		
		return y[k] + r*(y[k+1]-y[k]);
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_indx = function(x, n, z) {
		
		var k = ''; var ku = ''; var kl = ''; var km = '';

		if (z > x[0] && z < x[n-1]) {
		    kl	= 0;
		    ku	= n-1;
		    while (ku-kl > 1) {
				km	= (ku+kl)>>1;
				if (z > x[km])
				    kl	= km;
				else
				    ku	= km;
		    }
		    k	= kl;
		    if (z == x[k+1])
				k++;
		} 
		else if (z <= x[0])
		    k	= 0;
		else if (z >= x[n-1])
		    k	= n-2;
		else {
			msg = "ERROR in this.gsw_indx : out of range\n";
			meta = sprintf("z = %g, n = %d, x:\n", z, n);
			level = E_RECOVERABLE_ERROR;
			trigger_error(msg.meta, level);
		    for (kl=0; kl<n; kl++) {
		    	msg = sprintf("x[%d] = %g\n", kl, x[kl]);
				trigger_error(msg, level);
		    }
		    k	= 0;
		}
		return k;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_fdelta = function(p, lon, lat) {

		var saar = this.GSW_saar.gsw_saar(p,lon,lat);
		var sa	= ((1.0 + 0.35)*saar)/(1.0 - 0.35*saar);
		if (saar > 1e10)
		    sa	= GSW_INVALID_VALUE;
		else
		    sa	= ((1.0 + 0.35)*saar)/(1.0 - 0.35*saar);
		return sa;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sa_from_sp_baltic = function(sp, lon, lat) {
		
		var return_value = ''; 
		var xb_left = [12.6, 7.0, 26.0]; 
		var yb_left = [50.0, 59.0, 69.0];
		var xb_right = [45.0, 26.0];
		var yb_right = [50.0, 69.0];

		if (xb_left[1] < lon  && lon < xb_right[0]  && yb_left[0] < lat  && lat < yb_left[2]) {	  
		    var xx_left	= this.gsw_xinterp1(yb_left, xb_left, 3, lat);	    
		    var xx_right	= this.gsw_xinterp1(yb_right, xb_right, 2, lat);
	        if (xx_left <= lon  && lon <= xx_right)
				return_value	=((35.16504 - 0.087)/35.0)*sp + 0.087;
		    else
				return_value	= GSW_INVALID_VALUE;
		} else
			return_value	= GSW_INVALID_VALUE;
		return return_value;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_sp_from_sa_baltic = function(sa, lon, lat) {
              
		var return_value = ''; 
		var xb_left = [12.6, 7.0, 26.0]; 
		var yb_left = [50.0, 59.0, 69.0];
		var xb_right = [45.0, 26.0];
		var yb_right = [50.0, 69.0];

		if (xb_left[1] < lon && lon < xb_right[0] && yb_left[0] < lat && lat < yb_left[2]) {	  
		   var xx_left	= this.gsw_xinterp1(yb_left, xb_left, 3, lat);	    
		   var xx_right	= this.gsw_xinterp1(yb_right, xb_right, 2, lat);	    
		    if (xx_left <= lon  && lon <= xx_right)
				return_value	= (35.0/(35.16504 - 0.087))*(sa - 0.087);
		    else
				return_value	= GSW_INVALID_VALUE;
		} else
		    return_value	= GSW_INVALID_VALUE;
		    
		return return_value;
	}
	     
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_entropy_part = function(sa, t, p) {	

		var sfac	= 0.0248826675584615;

		var x2	= sfac*sa;
		var x	= Math.sqrt(x2);
		var y	= t*0.025;
		var z	= p*1e-4;

		var g03	= z*(-270.983805184062e0 +
			z*(776.153611613101e0 + z*(-196.51255088122e0 +
			   (28.9796526294175e0 - 2.13290083518327e0*z)*z))) +
			y*(-24715.571866078e0 + z*(2910.0729080936e0 +
			z*(-1513.116771538718e0 + z*(546.959324647056e0 +
			   z*(-111.1208127634436e0 + 8.68841343834394e0*z)))) +
			y*(2210.2236124548363e0 + z*(-2017.52334943521e0 +
			z*(1498.081172457456e0 + z*(-718.6359919632359e0 +
			   (146.4037555781616e0 - 4.9892131862671505e0*z)*z))) +
			y*(-592.743745734632e0 + z*(1591.873781627888e0 +
			z*(-1207.261522487504e0 + (608.785486935364e0 -
			   105.4993508931208e0*z)*z)) +
			y*(290.12956292128547e0 + z*(-973.091553087975e0 +
			z*(602.603274510125e0 + z*(-276.361526170076e0 +
			   32.40953340386105e0*z))) +
			y*(-113.90630790850321e0 + y*(21.35571525415769e0 -
			   67.41756835751434e0*z) +
			z*(381.06836198507096e0 + z*(-133.7383902842754e0 +
			   49.023632509086724e0*z)))))));

		var g08	= x2*(z*(729.116529735046e0 +
			z*(-343.956902961561e0 + z*(124.687671116248e0 +
			   z*(-31.656964386073e0 + 7.04658803315449e0*z)))) +
			x*( x*(y*(-137.1145018408982e0 + y*(148.10030845687618e0 +
			   y*(-68.5590309679152e0 + 12.4848504784754e0*y))) -
			22.6683558512829e0*z) + z*(-175.292041186547e0 +
			   (83.1923927801819e0 - 29.483064349429e0*z)*z) +
			y*(-86.1329351956084e0 + z*(766.116132004952e0 +
			   z*(-108.3834525034224e0 + 51.2796974779828e0*z)) +
			y*(-30.0682112585625e0 - 1380.9597954037708e0*z +
			   y*(3.50240264723578e0 + 938.26075044542e0*z)))) +
			y*(1760.062705994408e0 + y*(-675.802947790203e0 +
			y*(365.7041791005036e0 + y*(-108.30162043765552e0 +
			   12.78101825083098e0*y) +
			z*(-1190.914967948748e0 + (298.904564555024e0 -
			   145.9491676006352e0*z)*z)) +
			z*(2082.7344423998043e0 + z*(-614.668925894709e0 +
			   (340.685093521782e0 - 33.3848202979239e0*z)*z))) +
			z*(-1721.528607567954e0 + z*(674.819060538734e0 +
			z*(-356.629112415276e0 + (88.4080716616e0 -
			   15.84003094423364e0*z)*z)))));

		var return_value	= -1 * (g03 + g08)*0.025;

		return return_value;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_entropy_part_zerop = function(sa, pt0) {

		var sfac	= 0.0248826675584615;

		var x2	= sfac*sa;
		var x	= Math.sqrt(x2);
		var y	= pt0*0.025;

		var g03	= y*(-24715.571866078e0 + y*(2210.2236124548363e0 +
			y*(-592.743745734632e0 + y*(290.12956292128547e0 +
			y*(-113.90630790850321e0 + y*21.35571525415769e0)))));

		var g08	= x2*(x*(x*(y*(-137.1145018408982e0 + y*(148.10030845687618e0 +
			y*(-68.5590309679152e0 + 12.4848504784754e0*y)))) +
			y*(-86.1329351956084e0 + y*(-30.0682112585625e0 +
			   y*3.50240264723578e0))) +
			y*(1760.062705994408e0 + y*(-675.802947790203e0 +
			y*(365.7041791005036e0 + y*(-108.30162043765552e0 +
			   12.78101825083098e0*y)))));

		var return_value	= -1 * (g03 + g08)*0.025;

		return return_value;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_gibbs_pt0_pt0 = function(sa, pt0) {

		var sfac	= 0.0248826675584615;

		var x2	= sfac*sa;
		var x	= Math.sqrt(x2);
		var y	= pt0*0.025;

		var g03	= -24715.571866078e0 +
			y*(4420.4472249096725e0 +
			y*(-1778.231237203896e0 +
			y*(1160.5182516851419e0 +
			y*(-569.531539542516e0 + y*128.13429152494615e0))));

		var g08	= x2*(1760.062705994408e0 + x*(-86.1329351956084e0 +
			x*(-137.1145018408982e0 + y*(296.20061691375236e0 +
			y*(-205.67709290374563e0 + 49.9394019139016e0*y))) +
			y*(-60.136422517125e0 + y*10.50720794170734e0)) +
			y*(-1351.605895580406e0 + y*(1097.1125373015109e0 +
			y*(-433.20648175062206e0 + 63.905091254154904e0*y))));

		var return_value	= (g03 + g08)*0.000625;

		return return_value;
	}
	
	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_specvol_sso_0_p = function(p) {

		var sso			= 35.16504;
		var sqrtsso		= 5.930011804372737;      /*sqrt(SSO) = 5.930011804372737*/

		var return_value	= (this.v21 + sso*(this.v26 + this.v36*sso + this.v31*sqrtsso) 
						+ p*(this.v37 + this.v41*sso + p*(this.v43 + this.v47*p )))/
						(this.v01 + sso*(this.v05 + this.v08*sqrtsso)
						+ p*(this.v12 + this.v15*sso + p*(this.v17 + this.v20*sso)));

		return return_value;
	}

	TEOS10_gsw_oceanographic_toolbox.prototype.gsw_hill_ratio_at_sp2 = function(t) {
		var a0 =  0.0080e0; var a1 = -0.1692e0; var a2 = 25.3851e0;
		var a3 = 14.0941e0; var a4 = -7.0261e0; var a5 =  2.7081e0;
		var b0 =  0.0005e0; var b1 = -0.0056e0; var b2 = -0.0066e0;
		var b3 = -0.0375e0; var b4 =  0.0636e0; var b5 = -0.0144e0;
		var g0 = 2.641463563366498e-1; 	 	var g1 = 2.007883247811176e-4;
		var g2 = -4.107694432853053e-6; 	var g3 = 8.401670882091225e-8;
		var g4 = -1.711392021989210e-9; 	var g5 = 3.374193893377380e-11;
		var g6 = -5.923731174730784e-13; 	var g7 = 8.057771569962299e-15;
		var g8 = -7.054313817447962e-17; 	var g9 = 2.859992717347235e-19;
		var rk  =  0.0162e0; 				var sp2 = 2e0;

		var t68	= t * 1.00024;
		var ft68	= (t68 - 15.0)/(1.0 + rk*(t68 - 15.0));

	    /*!------------------------------------------------------------------------
	    **! Find the initial estimates of Rtx (Rtx0) and of the derivative dSP_dRtx
	    **! at SP = 2. 
	    **!------------------------------------------------------------------------
	    */
		var rtx0 = g0 + t68*(g1 + t68*(g2 + t68*(g3 + t68*(g4 + t68*(g5
				+ t68*(g6 + t68*(g7 + t68*(g8 + t68*g9))))))));
	     
		var dsp_drtx = a1 + (2*a2 + (3*a3 + (4*a4 + 5*a5*rtx0)*rtx0)*rtx0)*rtx0 
					+ ft68*(b1 + (2*b2 + (3*b3 + (4*b4 + 5*b5*rtx0)*rtx0)*rtx0)*rtx0);

	    /*!-------------------------------------------------------------------------
	    **! Begin a single modified Newton-Raphson iteration to find Rt at SP = 2.
	    **!-------------------------------------------------------------------------
	    */
		var sp_est	= a0 + (a1 + (a2 + (a3 + (a4 + a5*rtx0)*rtx0)*rtx0)*rtx0)*rtx0
					+ ft68*(b0 + (b1 + (b2+ (b3 + (b4 + b5*rtx0)*rtx0)*rtx0)*rtx0)*rtx0);
		var rtx		= rtx0 - (sp_est - sp2)/dsp_drtx;
		var rtxm		= 0.5*(rtx + rtx0);
		dsp_drtx	= a1 + (2*a2 + (3*a3 + (4*a4 + 5*a5*rtxm)*rtxm)*rtxm)*rtxm
					+ ft68*(b1 + (2*b2 + (3*b3 + (4*b4 + 5*b5*rtxm)* rtxm)*rtxm)*rtxm);
		rtx	= rtx0 - (sp_est - sp2)/dsp_drtx;
	    /*
	    **! This is the end of one full iteration of the modified Newton-Raphson 
	    **! iterative equation solver. The error in Rtx at this point is equivalent 
	    **! to an error in SP of 9e-16 psu.
	    */
	                                
		var x		= 400.0 * rtx * rtx;
		var sqrty	= 10.0 * rtx;
		var part1	= 1.0 + x*(1.5 + x);
		var part2	= 1.0 + sqrty*(1.0 + sqrty*(1.0 + sqrty));
		var sp_hill_raw_at_sp2	= sp2 - a0/part1 - b0*ft68/part2;

		return 2.0/sp_hill_raw_at_sp2;		
	}
//
//  The End
// ==========================================================================
//
