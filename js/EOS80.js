/*========================================================
 

 PURPOSE: Collection of routines to compute several 
	properties of seawater and ocean dynamics.
 REQUIRE: JQuery
 FUNCTIONS:
  
   sigmat()
   soundspeed()
   adtg()
   pottemp()
   freezepoint()
   salinity()
   coriolis()
   to_rad()
   distance()
 
 AUTHOR: © M. Tomczak 2000, original version
     © E. Garcia-Ladona, 12/06/2014, 
		- updated version to be used included in all
        tools section web pages. All the methods to
		compute the old seawater state equation (EOS-80)
		have been unified and combined into one unique 
		function. All the functions have been rewritten
		in order to be called either as a usual JavaScript
		function or from web forms using Jquery.
		Documenation
    © E. Garcia-Ladona, 10/2014, 
		- to_rad() and a distance_elipse() have been added.
    © E. Garcia-Ladona, 08/2018, 
		- Added a new function, managecomp(), to manage all
		  the forms submission. Now, all the tools are pure
		  numeric routines exported and called as a module
		  import into each webpage.
=======================================================*/

/*==================================================
 FUNCTION: sigmat(T, S, P, opcion=""): 

 PURPOSE: Compute the seawater density according
	to the EOS-80 algorithms.
 INPUT:
        T: temperatura in degrees ºC
        S: salinidad en PSU
        P: en db 
   option: if 'P' returns the density whithout the
		pressure corrections.
 OUTPUT:
		Returns an array with the seawater density
		in sigmat format (density - 1000)
 CHECKING VALUES:
   sigmat(T, S, P)
   sigmat(5,0,10000) = 1044.12802
   sigmat(25,35,0) = sigmat(25,35,0,opcion="P") = 1023.34306
   sigmat(25,35,10000) = 1062.53817
 VERSION:
        © M. Tomczak: original
        © E. García-Ladona (2014): Jquery to manage the forms
===============================================================*/
function sigmat(T, S, P, opcion = "") {
  if (arguments.length < 3) opcion = "P";

  var sqsal = Math.sqrt(S);
  var dens =
    -0.157406 +
    T *
      (6.793952e-2 -
        T *
          (9.09529e-3 -
            T * (1.001685e-4 - T * (1.120083e-6 - T * 6.536332e-9)))) +
    S *
      (8.24493e-1 -
        T * (4.0899e-3 - T * (7.6438e-5 - T * (8.2467e-7 - T * 5.3875e-9))) -
        sqsal * (5.72466e-3 - T * (1.0227e-4 - T * 1.6546e-6)) +
        S * 4.8314e-4);

  // Pressure terms
  var aw = 3.239908 + (1.43713e-3 + (1.16092e-4 - 5.77905e-7 * T) * T) * T;
  var bw = 8.50935e-5 + (-6.12293e-6 + 5.2787e-8 * T) * T;
  var aa =
    aw + (2.2838e-3 - (1.0981e-5 + 1.6078e-6 * T) * T + 1.91075e-4 * sqsal) * S;
  var bb = bw + (-9.9348e-7 + (2.0816e-8 + 9.1697e-10 * T) * T) * S;
  var kw =
    19652.21 +
    (148.4206 + (-2.327105 + (1.360477e-2 - 5.155288e-5 * T) * T) * T) * T;
  var k0 =
    kw +
    (54.6746 +
      (-0.603459 + (1.09987e-2 - 6.167e-5 * T) * T) * T +
      (7.944e-2 + (1.6483e-2 - 5.3009e-4 * T) * T) * sqsal) *
      S;

  // Devuelve la densidad sin correcciones de presión
  if (opcion == "P") return Math.round(10000 * dens) / 10000;

  P = 0.1 * P;
  var kk = k0 + (aa + bb * P) * P;
  var dens = (dens + 1000) / (1 - P / kk) - 1000;

  return Math.round(100000 * dens) / 100000;
}
// Fin sigmat()

/*===========================================================
FUNCTION: soundspeed()
PURPOSE: Computes the Sound speed in seawater in m/s

INPUT: Ti,Si,Pi (temperature in Celisus degrees, Salinity 
   in PSU, pressure in db)
OUTPUT: 1-d Array with the Sound speed
CHECK VALUES: T=40, S=40, P=10000 => C=1731.995 m/s
VERSION:
       © M. Tomczak: Initial version
       © E. García-Ladona (2014): Adapted to JQuery for the 
     forms
       © E. García-Ladona (2018): JQuery support removed
==========================================================*/
function soundspeed(Ti, Si, Pi) {
  var T = Ti;
  var S = Si;
  var P = Pi;

  P = P / 10;

  var c00 = 1402.388;
  var c01 = 5.03711;
  var c02 = -5.80852e-2;
  var c03 = 3.342e-4;
  var c04 = -1.478e-6;
  var c05 = 3.1464e-9;
  var c10 = 0.153563;
  var c11 = 6.8982e-4;
  var c12 = -8.1788e-6;
  var c13 = 1.3621e-7;
  var c14 = -6.1185e-10;
  var c20 = 3.126e-5;
  var c21 = -1.7107e-6;
  var c22 = 2.5974e-8;
  var c23 = -2.5335e-10;
  var c24 = 1.0405e-12;
  var c30 = -9.7729e-9;
  var c31 = 3.8504e-10;
  var c32 = -2.3643e-12;

  var a00 = 1.389;
  var a01 = -1.262e-2;
  var a02 = 7.164e-5;
  var a03 = 2.006e-6;
  var a04 = -3.21e-8;
  var a10 = 9.4742e-5;
  var a11 = -1.258e-5;
  var a12 = -6.4885e-8;
  var a13 = 1.0507e-8;
  var a14 = -2.0122e-10;
  var a20 = -3.9064e-7;
  var a21 = 9.1041e-9;
  var a22 = -1.6002e-10;
  var a23 = 7.988e-12;
  var a30 = 1.1e-10;
  var a31 = 6.649e-12;
  var a32 = -3.389e-13;

  var b00 = -1.922e-2;
  var b01 = -4.42e-5;
  var b10 = 7.3637e-5;
  var b11 = 1.7945e-7;

  var d00 = 1.727e-3;
  var d10 = -7.9836e-6;

  var Cw =
    c00 +
    c01 * T +
    c02 * T * T +
    c03 * T * T * T +
    c04 * T * T * T * T +
    c05 * T * T * T * T * T +
    (c10 + c11 * T + c12 * T * T + c13 * T * T * T + c14 * T * T * T * T) * P +
    (c20 + c21 * T + c22 * T * T + c23 * T * T * T + c24 * T * T * T * T) *
      P *
      P +
    (c30 + c31 * T + c32 * T * T) * P * P * P;

  var A =
    a00 +
    a01 * T +
    a02 * T * T +
    a03 * T * T * T +
    a04 * T * T * T * T +
    (a10 + a11 * T + a12 * T * T + a13 * T * T * T + a14 * T * T * T * T) * P +
    (a20 + a21 * T + a22 * T * T + a23 * T * T * T) * P * P +
    (a30 + a31 * T + a32 * T * T) * P * P * P;
  var B = b00 + b01 * T + (b10 + b11 * T) * P;
  var D = d00 + d10 * P;

  var soundsp = Cw + A * S + B * S * Math.sqrt(S) + D * S * S;

  return Math.round(1000 * soundsp) / 1000;
} // Fin soundspeed()

/*========================================================
FUNCTION: adtg()
PURPOSE: Computes the adiabatic gradient of seawater
 temperature
INPUT: Ti,Si,Pi (temperature in Celisus degrees, Salinity 
   in PSU, pressure in db)
OUTPUT: scalar with the adiabatic gradient
CHECK VALUES: T=40, S=40, P=10000 => C=1731.995 m/s
VERSION:
       © M. Tomczak: Initial version
       © E. García-Ladona (2014): Adapted to JQuery for the 
     forms
       © E. García-Ladona (2018): JQuery support removed
==========================================================*/
function adtg(S, T, P) {
  const a0 = 3.5803e-5,
    a1 = 8.5258e-6,
    a2 = -6.836e-8,
    a3 = 6.6228e-10;
  const b0 = 1.8932e-6,
    b1 = -4.2393e-8;
  const c0 = 1.8741e-8,
    c1 = -6.7795e-10,
    c2 = 8.733e-12,
    c3 = -5.4481e-14;
  const d0 = -1.1351e-10,
    d1 = 2.7759e-12;
  const e0 = -4.6206e-13,
    e1 = 1.8676e-14,
    e2 = -2.1687e-16;

  let grad =
    a0 +
    (a1 + (a2 + a3 * T) * T) * T +
    (b0 + b1 * T) * (S - 35) +
    (c0 + (c1 + (c2 + c3 * T) * T) * T + (d0 + d1 * T) * (S - 35)) * P +
    (e0 + (e1 + e2 * T) * T) * P * P;
  return grad;
}
// Fin  adtg():

/*==============================================
FUNCTION: pottemp(Ti, Si, Pi, PRi=0.0)
PURPOSE: Computes the seawater potential temperature
 at a pressure reference level. 
INPUT: Ti: temperatura en Celisus, 
       Si: Salinitat, 
   Pi: pressió db)
       PRi: pressió referència
OUTPUT: 1-d Array with potential temperature
REQUIRE:
 - adtg: local function to compute the adiabaic gradient
CHECK VALUES:
  ( T,  S,     P, Pref) = pottemp()
  (20, 35,  4000, 0) = 19.2110837430117 C
  (40, 40, 10000, 0) = 36.89073 C
VERSION:
       © M. Tomczak: Initial version
       © E. García-Ladona (2014): Jquery to manage the forms
   © E. García-Ladona (2018): JQuery support removed
========================================================*/
function pottemp(T, S, P, PR = 0.0) {
  //	var T = Ti; var S = Si; var P = Pi; var PR = PRi;
  const root2 = Math.sqrt(2);

  let delP = PR - P;
  let delth = delP * adtg(S, T, P);
  let th = T + 0.5 * delth;
  let q = delth;

  delth = delP * adtg(S, th, P + 0.5 * delP);
  th = th + (1 - 1 / root2) * (delth - q);
  q = (2 - root2) * delth + (-2 + 3 / root2) * q;

  delth = delP * adtg(S, th, P + 0.5 * delP);
  th = th + (1 + 1 / root2) * (delth - q);
  q = (2 + root2) * delth + (-2 - 3 / root2) * q;

  delth = delP * adtg(S, th, P + delP);

  let pottemp = th + (delth - 2 * q) / 6;

  return Math.round(10000 * pottemp) / 10000;
}
// Fin pottemp()

/*=======================================================
FUNCTION: freezepoint(Si, Pi)
PURPOSE:  
INPUT: Si: salinity in PSU, 
     Pi: pressure in db
OUTPUT: 1-d Array with the freeze point
CHECK VALUES:
 (S, P)
 (40, 500) => -2.588567 error of about 0.003 at 500 db
VERSION:
   © M. Tomczak: Initial version
   © E. García-Ladona (2014): Jquery to manage the forms
 © E. García-Ladona (2018): JQuery support removed
========================================================*/
function freezepoint(S, P) {
  //var S = Si; var P = Pi;
  const a0 = -0.0575;
  const a1 = 1.710523e-3;
  const a2 = -2.154996e-4;
  const b = -7.53e-4;

  let fpoint = a0 * S + a1 * S * Math.sqrt(S) + a2 * S * S + b * P;

  return Math.round(100000 * fpoint) / 100000;
}
// Fin  freezepoint()

/*=========================================================
FUNCTION: salinity(Ti, CRi, Ci, Pi)
PURPOSE: Computes the salinty through two methods 
   1) from Conductivity, Temperature and local pressure
   2) from the conductivity ratio and temperature
 The method is choosen through the CONDUCT variable:
           el formulari. Si el formulari 
           if id="CR" existe S a partir de R i T
           si id="CR" no existeix, s(C,T,P)

INPUT: Ti: temperature in Celisus degrees, 
       CRi: conductivity ratio, 
   Ci: conductivity in 
       Pi: pressure in db 
OUTPUT: 1-d Array with the salinity value
CHECK VALUES:
 1)(T, C, P)
 ( ,  ) => 
 2) (T, R)
  (15, 1.00000) => 35.00000 
  (20, 1.0568875) => 37.245628 
  ( 5, 0.81705885) => 27.995347
  
VERSION:
   © M. Tomczak: Initial version
   © E. García-Ladona (2014): Jquery to manage the forms
     Unificació dels dos mètodes en una única rutina.
 © E. García-Ladona (2018): JQuery support removed
============================================================*/
function salinity(Ti, CRi, Ci, Pi) {
  var T = Ti;
  var CONDUCT = false;

  if (arguments.length > 2) {
    var C = CRi;
    var P = Ci;
  } else {
    CONDUCT = true;
    var CR = CRi;
  }

  if (!CONDUCT) {
    const e1 = 2.07e-5,
      e2 = -6.37e-10,
      e3 = 3.989e-15;
    const d1 = 3.426e-2,
      d2 = 4.464e-4,
      d3 = 4.215e-1,
      d4 = -3.107e-3;
    const c0 = 0.6766097,
      c1 = 2.00564e-2,
      c2 = 1.104259e-4,
      c3 = -6.9698e-7,
      c4 = 1.0031e-9;

    var R = C / 42.914;
    var R1 = P * (e1 + (e2 + e3 * P) * P);
    var R2 = 1 + (d1 + d2 * T) * T + (d3 + d4 * T) * R;
    var Rp = 1 + R1 / R2;

    var rt = c0 + (c1 + (c2 + (c3 + c4 * T) * T) * T) * T;
  }

  const a0 = 0.008,
    a1 = -0.1692;
  const a2 = 25.3851,
    a3 = 14.0941;
  const a4 = -7.0261,
    a5 = 2.7081;
  const b0 = 0.0005,
    b1 = -0.0056;
  const b2 = -0.0066,
    b3 = -0.0375;
  const b4 = 0.0636,
    b5 = -0.0144;
  const k = 0.0162;

  if (!CONDUCT) {
    CR = R / (Rp * rt);
  }

  let Rtx = Math.sqrt(CR);
  let delT = T - 15.0;
  let delS =
    (delT / (1 + k * delT)) *
    (b0 + (b1 + (b2 + (b3 + (b4 + b5 * Rtx) * Rtx) * Rtx) * Rtx) * Rtx);

  let S =
    a0 + (a1 + (a2 + (a3 + (a4 + a5 * Rtx) * Rtx) * Rtx) * Rtx) * Rtx + delS;

  return Math.round(1000000 * S) / 1000000;
} // Fin  salinity()

/*=============================================
FUNCTION: coriolis(lat):
PURPOSE: Compute the Coriolis frequency 
INPUT: lat (float): cgs degrees of latitude.

OUTPUT: 2-d Array [frequency, period] 
    frequency: is in 10-4 s-1 units.
        period: in hours.
VERSION:
   © M. Tomczak: Initial version
   © E. García-Ladona (2014): Jquery to manage the forms
   © E. Garcia-Ladona (08/2018): JQuery support removed
================================================*/
function coriolis(lat, n) {
  // alert(lat)
  const DEG2RAD = Math.PI / 180;
  const OMEGA = (2 * Math.PI) / (24 * 3600);

  let f = 2 * OMEGA * Math.sin(lat * DEG2RAD);
  let Tf = (2 * Math.PI) / (3600 * f);

  if (n == 1) return Math.round(10000000 * f) / 1000;
  else return Math.abs(Math.round(1000 * Tf) / 1000);
  // return [Math.round(10000000*f)/1000, Math.abs(Math.round(1000*Tf)/1000)];
} // Fin  coriolis()

/*===========================================================
FUNCTION: to_rad(): Convierte las valores de ángulos de las
  posiciones geográficas a angulos centesimales y radianes. 
  Admite como entrada cadenas de texto típicas de las 
  notaciones geográficas, por ejemplo "090º30'N", "90.5N", 90.5
  En el último caso se asume el mismo signo del angulo
  que el valor numérico de entrada es decir 90.5 es quivalente 
  a 90.5 N en cuanto al signo.

INPUT:
    angle: cadena o float con el ángulo 
    opt: cadena opcional si sólamente se quieren transformar 
    los ángulos a formato sexagesimal, en cuyo caso su valor
    es "cgs"

OUTPUT: 
      anglerad: float, valor en radianes o grados centesimales
VERSION:
     © E. García-Ladona: Documentación
==============================================================*/
function to_rad(angle, opt) {
  let signo = 1,
    grados = 0.0,
    minutos = 0.0,
    segundos = 0.0,
    angleh = "";
  let anglerad;

  const DEG2RAD = Math.PI / 180;
  // Primero determinamos si el ángulo es un valor numérico o no
  if (typeof angle != "number") {
    if (angle.search(/[OWS]/) != -1) signo = -1;
    // Eliminamos el hemisferio, y ciertos caracteres raros.
    angleh = angle.replace(/[NEWS]/, "");
    angleh = angleh.replace(/[´′]/, "'");
    angleh = angleh.replace(/[°]/, "º");

    if (angleh.search("º") != -1) {
      //Separamos por los grados
      let gradoss = angleh.split("º");
      grados = parseInt(gradoss[0]);
      if (gradoss[1].length != 0) {
        //Separamos los minutos
        var minutoss = gradoss[1].split("'");
        minutos = parseInt(minutoss[0]);
      }
      segundos = minutoss[1].length != 0 ? parseFloat(minutoss[1]) : 0.0;
      anglerad = signo * (grados + minutos / 60 + segundos / 3600);
    } else {
      anglerad = signo * parseFloat(angleh);
    }
  } else {
    anglerad = parseFloat(angle);
  }

  if (opt == "cgs") return anglerad;
  else return anglerad * DEG2RAD;
} // End to_rad()si

/*===========================================================
FUNCTION: distance_elipse(): Calcula la distància entre dos 
 punts sobre la superfície terrestre a partir d'un model 
 d'el·lipsoide (Datum WGS-84)
 * 
INPUT: lat1:, lon1:, lat2:, lon2: coordenades
 de punts (lat1,lon1) --> (lat2,lon2). El format 
 d'entrada es flexible i pot ser donat com un float 
 o una cadena. Exemple de valors admesos:
   lat1: 34.456 - 34.456 N - 34º25'14.340"N
 En el cas de no existència de l'identificador de l'hemisferi
 (N,S,W,E,..) suposa sempre graus positius seguint la convenció
 Nord positiu, Est positiu.
   
OUTPUT: La sortida pot ser de dos tipus:
  * un vector: [d,dm,a1,a2] on cada element és
     d = Distància en km
    dm = Distància en milles nàutiques
    a1 = l'angle inicial respecte al Nord
    a2 = l'angle final respecte al Nord

REQUIRE: to_rad() to transform the coordinates from degrees
         to cgs and radians values.
VERSION:
 © M. Tomczak: original "plane" calculation routine
   © Chris Veness 2002-2014: T Vincenty algorithm from,
  "Direct and Inverse Solutions of Geodesics on the 
   Ellipsoid with application of nested equations", 
   Survey Review, vol XXIII no 176, 1975 avaliable at
   http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf
     Code available at GitHub:https://github.com/chrisveness/geodesy/blob/master/latlon-vincenty.js
   © E. García-Ladona: Both methods integrated in 
   www.physocean.icm.csic.es/utilities/
=============================================================*/
function distance(lati1, loni1, lati2, loni2, option = "pla") {
  let lat1 = to_rad(lati1);
  let lon1 = to_rad(loni1);
  let lat2 = to_rad(lati2);
  let lon2 = to_rad(loni2);

  if (option == "pla") {
    const DEG2RAD = Math.PI / 180;
    const RAD2DEG = 1 / DEG2RAD;
    const DEG2NM = 60;
    const NM2KM = 1.852;

    let dlat = (lat2 - lat1) * RAD2DEG;
    let dlon = (lon2 - lon1) * RAD2DEG;
    let signum = 1;
    if (dlon < 0) signum = -1;
    if (Math.abs(dlon) > 180) dlon = signum * (360 - Math.abs(dlon));

    let latrad1 = Math.abs(lat1);
    let latrad2 = Math.abs(lat2);

    let dep = Math.cos((latrad2 + latrad1) / 2) * dlon;
    let dist = DEG2NM * Math.sqrt(dlat * dlat + dep * dep);
    let dkm = dist * NM2KM;
    let angle = 0;
    if (lat2 < lat1) angle = 180;
    //   if (dlon > 0 && dlat == 0) angle = 90;
    //   if (dlon < 0 && dlat== 0) angle = 270;
    if (dlon > 0 && dlat == 0) angle = 90;
    if (dlon < 0 && dlat == 0) angle = 270;
    if (dlon != 0) angle = Math.atan(dlat / Math.abs(dlon)) * RAD2DEG;
    if (dlon < 0 && dlat < 0) angle = angle + 180;
    if (dlon > 0 && dlat < 0) angle = angle + 270;
    if (dlon > 0 && dlat > 0) angle = angle + 270;

    return [
      Math.round(100 * dist) / 100,
      Math.round(1000 * dkm) / 1000,
      Math.round(100 * angle) / 100,
    ];
  } else {
    // WGS-84 Datum	del elipsoide
    const a = 6378137.0; // No necesario
    const b = 6356752.314245; // No necesario
    const f = 1 / 298.257223563; // (a-b)/a

    let L = lon2 - lon1;

    let tanU1 = (1 - f) * Math.tan(lat1),
      cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1),
      sinU1 = tanU1 * cosU1;
    let tanU2 = (1 - f) * Math.tan(lat2),
      cosU2 = 1 / Math.sqrt(1 + tanU2 * tanU2),
      sinU2 = tanU2 * cosU2;

    let λ = L,
      λʹ,
      iterationLimit = 100;
    do {
      var sinλ = Math.sin(λ),
        cosλ = Math.cos(λ);
      var sinSqσ =
        cosU2 * sinλ * (cosU2 * sinλ) +
        (cosU1 * sinU2 - sinU1 * cosU2 * cosλ) *
          (cosU1 * sinU2 - sinU1 * cosU2 * cosλ);
      var sinσ = Math.sqrt(sinSqσ);
      if (sinσ == 0) return 0; // co-incident points
      var cosσ = sinU1 * sinU2 + cosU1 * cosU2 * cosλ;
      var σ = Math.atan2(sinσ, cosσ);
      var sinα = (cosU1 * cosU2 * sinλ) / sinσ;
      var cosSqα = 1 - sinα * sinα;
      var cos2σM = cosσ - (2 * sinU1 * sinU2) / cosSqα;
      if (isNaN(cos2σM)) cos2σM = 0; // equatorial line: cosSqα=0 (§6)
      var C = (f / 16) * cosSqα * (4 + f * (4 - 3 * cosSqα));
      λʹ = λ;
      λ =
        L +
        (1 - C) *
          f *
          sinα *
          (σ + C * sinσ * (cos2σM + C * cosσ * (-1 + 2 * cos2σM * cos2σM)));
    } while (Math.abs(λ - λʹ) > 1e-12 && --iterationLimit > 0);
    if (iterationLimit == 0) throw new Error("Formula failed to converge");

    let uSq = (cosSqα * (a * a - b * b)) / (b * b);

    let A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    let B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    let Δσ =
      B *
      sinσ *
      (cos2σM +
        (B / 4) *
          (cosσ * (-1 + 2 * cos2σM * cos2σM) -
            (B / 6) *
              cos2σM *
              (-3 + 4 * sinσ * sinσ) *
              (-3 + 4 * cos2σM * cos2σM)));

    let s = b * A * (σ - Δσ);

    let alpha1 = Math.atan2(cosU2 * sinλ, cosU1 * sinU2 - sinU1 * cosU2 * cosλ);
    let alpha2 = Math.atan2(
      cosU1 * sinλ,
      -sinU1 * cosU2 + cosU1 * sinU2 * cosλ
    );

    alpha1 = (alpha1 + 2 * Math.PI) % (2 * Math.PI); // normalise to 0...360
    alpha2 = (alpha2 + 2 * Math.PI) % (2 * Math.PI); // normalise to 0...360

    return [
      Math.round((1000 * s) / 1852.0) / 1000,
      Math.round((1000 * s) / 1000) / 1000,
      alpha1,
      alpha2,
    ];
  }
} //End of function

function p_from_z(z, lat, geo_strf_dyn_height = 0) {
  /*
      Calculates sea pressure from height using computationally-efficient
      48-term expression for density, in terms of SA, CT and p (McDougall et al.,
      2011).  Dynamic height anomaly, geo_strf_dyn_height, if provided, must be
      computed with its pr=0 (the surface.)
      Parameters
      ----------
      z : array_like
      height [m]
      lat : array_like
      latitude in decimal degrees north [-90..+90]
      geo_strf_dyn_height : float, optional
      dynamic height anomaly [ m :sup:`2` s :sup:`-2` ]
      The reference pressure (p_ref) of geo_strf_dyn_height
      must be zero (0) dbar.
      Returns
      -------
      p : array_like
      pressure [dbar]
      Examples
      --------
      >>> import gsw
      >>> z = [-10., -50., -125., -250., -600., -1000.]
      >>> lat = 4.
      >>> gsw.p_from_z(z, lat)
      array([   10.05572704,    50.28354425,   125.73185732,   251.54028663,
      604.2099135 ,  1007.9900587 ])
      >>> -gsw.z_from_p(gsw.p_from_z(z, lat), lat)
      array([  10.,   50.,  125.,  250.,  600., 1000.])
      Notes
      -----
      Height (z) is NEGATIVE in the ocean. Depth is -z. Depth is not used in the
      gibbs library.
      References
      ----------
      .. [1] IOC, SCOR and IAPSO, 2010: The international thermodynamic equation
      of seawater - 2010: Calculation and use of thermodynamic properties.
      Intergovernmental Oceanographic Commission, Manuals and Guides No. 56,
      UNESCO (English), 196 pp.
      .. [2] McDougall T.J., P.M. Barker, R. Feistel and D.R. Jackett, 2011: A
      computationally efficient 48-term expression for the density of seawater
      in terms of Conservative Temperature, and related properties of seawater.
      .. [3] Moritz (2000) Goedetic reference system 1980. J. Geodesy, 74,
      128-133.
      .. [4] Saunders, P. M., 1981: Practical conversion of pressure to depth.
      Journal of Physical Oceanography, 11, 573-574.
      */
  z = z * -1;
  var X, c1, df_dp, f, gs, p, p_mid, p_old, sin2;
  DEG2RAD = Math.PI / 180.0;
  X = Math.sin(lat * DEG2RAD);
  sin2 = Math.pow(X, 2);
  gs = 9.780327 * (1.0 + (0.0052792 + 2.32e-5 * sin2) * sin2);
  c1 = 0.00525 * sin2 + 0.00592;
  p = (-2 * z) / (1 - c1 + Math.sqrt((1 - c1) * (1 - c1) + 8.84e-6 * z));
  db2Pascal = 1e4;
  gamma = 2.26e-7;
  df_dp = db2Pascal * specvol_SSO_0_p(p);
  f =
    enthalpy_SSO_0_p(p) +
    gs * (z - 0.5 * gamma * Math.pow(z, 2)) -
    geo_strf_dyn_height;
  p_old = p;
  p = p_old - f / df_dp;
  p_mid = 0.5 * (p + p_old);
  df_dp = db2Pascal * specvol_SSO_0_p(p_mid);
  p = p_old - f / df_dp;
  return p;
}
function specvol_SSO_0_p(p) {
  /*
      This function calculates specific volume at the Standard Ocean
      Salinity, SSO, and at a Conservative Temperature of zero degrees C, as a
      function of pressure, p, in dbar, using a streamlined version of the
      48-term CT version of specific volume, that is, a streamlined version of
      the code "specvol(SA, CT, p)".
      */
  var v01, v05, v08, v12, v15, v17, v20, v21, v26, v31, v36, v37, v41, v43, v47;
  SSO = 35.16504;
  v01 = 999.8420897506056;
  v05 = -6.698001071123802;
  v08 = -0.0398882237896849;
  v12 = -0.02233269627352527;
  v15 = -0.0001806789763745328;
  v17 = -3.087032500374211e-7;
  v20 = 1.55093272922008e-10;
  v21 = 1.0;
  v26 = -0.007521448093615448;
  v31 = -3.303308871386421e-5;
  v36 = 5.41932655114874e-6;
  v37 = -2.742185394906099e-5;
  v41 = -1.105097577149576e-7;
  v43 = -1.11901159287511e-10;
  v47 = -1.200507748551599e-15;
  return (
    (v21 +
      SSO * (v26 + v36 * SSO + v31 * Math.sqrt(SSO)) +
      p * (v37 + v41 * SSO + p * (v43 + v47 * p))) /
    (v01 +
      SSO * (v05 + v08 * Math.sqrt(SSO)) +
      p * (v12 + v15 * SSO + p * (v17 + v20 * SSO)))
  );
}
function enthalpy_SSO_0_p(p) {
  /*
      This function calculates enthalpy at the Standard Ocean Salinty, SSO,
      and at a Conservative Temperature of zero degrees C, as a function of
      pressure, p, in dbar, using a streamlined version of the 48-term CT
      version of the Gibbs function, that is, a streamlined version of the
      code "enthalpy(SA,CT,p).
      Examples
      --------
      >>> import gsw
      >>> p = np.array([10, 50, 125, 250, 600, 1000])
      >>> gsw.library.enthalpy_SSO_0_p(p)
      array([   97.26388276,   486.27439004,  1215.47518168,  2430.24919716,
      5827.90973888,  9704.32296903])
      References
      ----------
      .. [1] McDougall T.J., P.M. Barker, R. Feistel and D.R. Jackett, 2013:  A
      computationally efficient 48-term expression for the density of seawater
      in terms of Conservative Temperature, and related properties of
      seawater.  To be submitted to J. Atm. Ocean. Technol., xx, yyy-zzz.
      */
  var A,
    B,
    M,
    N,
    a0,
    a1,
    a2,
    a3,
    b0,
    b1,
    b1sq,
    b2,
    part,
    sqrt_disc,
    v01,
    v05,
    v08,
    v12,
    v15,
    v17,
    v20,
    v21,
    v26,
    v31,
    v36,
    v37,
    v41,
    v43,
    v47;
  SSO = 35.16504;
  v01 = 999.8420897506056;
  v05 = -6.698001071123802;
  v08 = -0.0398882237896849;
  v12 = -0.02233269627352527;
  v15 = -0.0001806789763745328;
  v17 = -3.087032500374211e-7;
  v20 = 1.55093272922008e-10;
  v21 = 1.0;
  v26 = -0.007521448093615448;
  v31 = -3.303308871386421e-5;
  v36 = 5.41932655114874e-6;
  v37 = -2.742185394906099e-5;
  v41 = -1.105097577149576e-7;
  v43 = -1.11901159287511e-10;
  v47 = -1.200507748551599e-15;
  a0 = v21 + SSO * (v26 + v36 * SSO + v31 * Math.sqrt(SSO));
  a1 = v37 + v41 * SSO;
  a2 = v43;
  a3 = v47;
  b0 = v01 + SSO * (v05 + v08 * Math.sqrt(SSO));
  b1 = 0.5 * (v12 + v15 * SSO);
  b2 = v17 + v20 * SSO;
  b1sq = Math.pow(b1, 2);
  sqrt_disc = Math.sqrt(b1sq - b0 * b2);
  N = a0 + ((2 * a3 * b0 * b1) / b2 - a2 * b0) / b2;
  M = a1 + ((4 * a3 * b1sq) / b2 - a3 * b0 - 2 * a2 * b1) / b2;
  A = b1 - sqrt_disc;
  B = b1 + sqrt_disc;
  part = (N * b2 - M * b1) / (b2 * (B - A));
  db2Pascal = 1e4;
  return (
    db2Pascal *
    ((p * (a2 - (2 * a3 * b1) / b2 + 0.5 * a3 * p)) / b2 +
      (M / (2 * b2)) * Math.log(1 + (p * (2 * b1 + b2 * p)) / b0) +
      part * Math.log(1 + (b2 * p * (B - A)) / (A * (B + b2 * p))))
  );
}

function z_from_p(p, lat, geo_strf_dyn_height = 0) {
  /*
      Calculates height from sea pressure using the computationally-efficient
      48-term expression for density in terms of SA, CT and p (McDougall et
      al., 2011).  Dynamic height anomaly, geo_strf_dyn_height, if provided, must
      be computed with its pr=0 (the surface).
      Parameters
      ----------
      p : array_like
      pressure [dbar]
      lat : array_like
      latitude in decimal degrees north [-90..+90]
      geo_strf_dyn_height : float, optional
      dynamic height anomaly [ m :sup:`2` s :sup:`-2` ]
      Returns
      -------
      z : array_like
      height [m]
      Examples
      --------
      >>> import gsw
      >>> p = [10, 50, 125, 250, 600, 1000]
      >>> lat = 4
      >>> gsw.z_from_p(p, lat)
      array([  -9.94458313,  -49.71808883, -124.27262301, -248.47007032,
      -595.82544461, -992.09217796])
      Notes
      -----
      At sea level z = 0, and since z (HEIGHT) is defined to be positive upwards,
      it follows that while z is positive in the atmosphere, it is NEGATIVE in
      the ocean.
      References
      ----------
      .. [1] IOC, SCOR and IAPSO, 2010: The international thermodynamic equation
      of seawater - 2010: Calculation and use of thermodynamic properties.
      Intergovernmental Oceanographic Commission, Manuals and Guides No. 56,
      UNESCO (English), 196 pp.
      .. [2] McDougall T.J., P.M. Barker, R. Feistel and D.R. Jackett, 2011:  A
      computationally efficient 48-term expression for the density of seawater
      in terms of Conservative Temperature, and related properties of seawater.
      .. [3] Moritz (2000) Goedetic reference system 1980. J. Geodesy, 74,
      128-133.
      */
  DEG2RAD = Math.PI / 180.0;
  gamma = 2.26e-7;
  var A, B, C, X, sin2;
  X = Math.sin(lat * DEG2RAD);
  sin2 = Math.pow(X, 2);
  B = 9.780327 * (1.0 + (0.0052792 + 2.32e-5 * sin2) * sin2);
  A = -0.5 * gamma * B;
  C = enthalpy_SSO_0_p(p) - geo_strf_dyn_height;
  return (2 * C) / (B + Math.sqrt(Math.pow(B, 2) - 4 * A * C));
}

function gsw_rho(sa, ct, p) {
  v01 = 9.998420897506056e2;
  v02 = 2.839940833161907;
  v03 = -3.147759265588511e-2;
  v04 = 1.181805545074306e-3;
  v05 = -6.698001071123802;
  v06 = -2.986498947203215e-2;
  v07 = 2.327859407479162e-4;
  v08 = -3.98882237896849e-2;
  v09 = 5.0954225738805e-4;
  v10 = -1.426984671633621e-5;
  v11 = 1.645039373682922e-7;
  v12 = -2.233269627352527e-2;
  v13 = -3.43609007985188e-4;
  v14 = 3.726050720345733e-6;
  v15 = -1.806789763745328e-4;
  v16 = 6.876837219536232e-7;
  v17 = -3.087032500374211e-7;
  v18 = -1.988366587925593e-8;
  v19 = -1.061519070296458e-11;
  v20 = 1.55093272922008e-10;
  v21 = 1.0;
  v22 = 2.775927747785646e-3;
  v23 = -2.349607444135925e-5;
  v24 = 1.119513357486743e-6;
  v25 = 6.743689325042773e-10;
  v26 = -7.521448093615448e-3;
  v27 = -2.764306979894411e-5;
  v28 = 1.262937315098546e-7;
  v29 = 9.527875081696435e-10;
  v30 = -1.811147201949891e-11;
  v31 = -3.303308871386421e-5;
  v32 = 3.801564588876298e-7;
  v33 = -7.672876869259043e-9;
  v34 = -4.634182341116144e-11;
  v35 = 2.681097235569143e-12;
  v36 = 5.41932655114874e-6;
  v37 = -2.742185394906099e-5;
  v38 = -3.212746477974189e-7;
  v39 = 3.191413910561627e-9;
  v40 = -1.931012931541776e-12;
  v41 = -1.105097577149576e-7;
  v42 = 6.211426728363857e-10;
  v43 = -1.11901159287511e-10;
  v44 = -1.941660213148725e-11;
  v45 = -1.8648264253656e-14;
  v46 = 1.119522344879478e-14;
  v47 = -1.200507748551599e-15;
  v48 = 6.057902487546866e-17;

  var sqrtsa = Math.sqrt(sa);

  var v_hat_denominator =
    v01 +
    ct * (v02 + ct * (v03 + v04 * ct)) +
    sa *
      (v05 +
        ct * (v06 + v07 * ct) +
        sqrtsa * (v08 + ct * (v09 + ct * (v10 + v11 * ct)))) +
    p *
      (v12 +
        ct * (v13 + v14 * ct) +
        sa * (v15 + v16 * ct) +
        p * (v17 + ct * (v18 + v19 * ct) + v20 * sa));

  var v_hat_numerator =
    v21 +
    ct * (v22 + ct * (v23 + ct * (v24 + v25 * ct))) +
    sa *
      (v26 +
        ct * (v27 + ct * (v28 + ct * (v29 + v30 * ct))) +
        v36 * sa +
        sqrtsa * (v31 + ct * (v32 + ct * (v33 + ct * (v34 + v35 * ct))))) +
    p *
      (v37 +
        ct * (v38 + ct * (v39 + v40 * ct)) +
        sa * (v41 + v42 * ct) +
        p * (v43 + ct * (v44 + v45 * ct + v46 * sa) + p * (v47 + v48 * ct)));

  return v_hat_denominator / v_hat_numerator - 1000;
}

function gsw_sound_speed_t_exact(sa, t, p) {
  var n0 = 0;
  var n1 = 1;
  var n2 = 2;

  var g_tt = gsw_gibbs(n0, n2, n0, sa, t, p);
  var g_tp = gsw_gibbs(n0, n1, n1, sa, t, p);

  return (
    gsw_gibbs(n0, n0, n1, sa, t, p) *
    Math.sqrt(g_tt / (g_tp * g_tp - g_tt * gsw_gibbs(n0, n0, n2, sa, t, p)))
  );
}

function decimaldegree(str) {
  // console.log(str)
  const regex =
    /\s*([+-]?)(\d{1,3}(?:\.\d+)?)[°°\s*,]?\s*(\d{1,2}(?:\.\d+)?)?[\s*,\'\′]?\s*(\d+(?:\.\d+)?)?[\s*\"\″]?\s*([NESWneswсСюЮзЗвВ]?)/;
  //   const regex = /(\d+),(\d+),(\d+(?:\.\d+)?)\s([NESWnesw])/;
  //   const regex =  /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/; // широта
  //   const regex =  /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/;  //долгота
  if (regex.test(str)) {
    let [_, sign, degrees, minutes, seconds, direction] = regex.exec(str);
    const n_degrees = parseFloat(degrees);
    const n_minutes = minutes ? parseFloat(minutes) / 60 : 0;
    const n_seconds = seconds ? parseFloat(seconds) / (60 * 60) : 0;
    // console.log(n_minutes + n_seconds, direction);
    if (Math.abs(n_degrees) > 180 || n_minutes + n_seconds >= 1) return null;
    let dd = parseFloat(degrees) + n_minutes + n_seconds;
    if (
      ["S", "s", "W", "w", "Ю", "ю", "З", "з"].indexOf(direction) != -1 ||
      sign == "-"
    ) {
      dd = dd * -1;
    }
    // console.log(sign, degrees, minutes, seconds, direction);
    return dd;
  } else return null;
}

function freezing(sa, p, saturation_fraction) {
  var c0 = 0.017947064327968736;
  var c1 = -6.076099099929818;
  var c2 = 4.883198653547851;
  var c3 = -11.88081601230542;
  var c4 = 13.34658511480257;
  var c5 = -8.722761043208607;
  var c6 = 2.082038908808201;
  var c7 = -7.389420998107497;
  var c8 = -2.110913185058476;
  var c9 = 0.2295491578006229;
  var c10 = -0.9891538123307282;
  var c11 = -0.08987150128406496;
  var c12 = 0.3831132432071728;
  var c13 = 1.054318231187074;
  var c14 = 1.065556599652796;
  var c15 = -0.7997496801694032;
  var c16 = 0.3850133554097069;
  var c17 = -2.078616693017569;
  var c18 = 0.8756340772729538;
  var c19 = -2.079022768390933;
  var c20 = 1.596435439942262;
  var c21 = 0.1338002171109174;
  var c22 = 1.242891021876471;

  var sa_r = sa * 1e-2;
  var x = Math.sqrt(sa_r);
  var p_r = p * 1e-4;

  var ct_freezing =
    c0 +
    sa_r * (c1 + x * (c2 + x * (c3 + x * (c4 + x * (c5 + c6 * x))))) +
    p_r * (c7 + p_r * (c8 + c9 * p_r)) +
    sa_r *
      p_r *
      (c10 +
        p_r * (c12 + p_r * (c15 + c21 * sa_r)) +
        sa_r * (c13 + c17 * p_r + c19 * sa_r) +
        x *
          (c11 +
            p_r * (c14 + c18 * p_r) +
            sa_r * (c16 + c20 * p_r + c22 * sa_r)));
  /*
   ** Adjust for the effects of dissolved air
   */
  var a = 0.014289763856964; /* Note that a = 0.502500117621/35.16504. */
  var b = 0.05700064989972;
  ct_freezing =
    ct_freezing -
    saturation_fraction * 1e-3 * (2.4 - a * sa) * (1 + b * (1 - sa / 35.16504));

  if (p > 10000 || sa > 120 || p + sa * 71.428571428571402 > 13571.42857142857)
    ct_freezing = GSW_INVALID_VALUE;

  return ct_freezing;
}
