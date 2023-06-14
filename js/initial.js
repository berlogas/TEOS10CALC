// Параметры в params из отдельно заполняемых констант - id должны начинаться с _

const mydata = [
  { label: "Temperature <i>t</i> ,°C", input: "temperature" },
  { label: "Potential Temperature <i>θ</i>,°C", input: "ptemperature" },
  { label: "Conservative Temperature Θ,°C", input: "ctemperature" },
  { label: "Practical Salinity <i>S</i><sub>p</sub> ", input: "salinity" },
  { label: "Absolute Salinity <i>S</i><sub>A</sub>, g/kg ", input: "asalinity" },
  { label: "Preformed Salinity <i>S</i><sub>*</sub>, g/kg ", input: "psalinity" },
  { label: "Reference Salinity <i>S</i><sub>R</sub>, g/kg ", input: "rsalinity" },
  { label: "Pressure <i>p</i>, dbar", input: "pressure" },
  // { label: "Давление reference, dbar", input: "rpressure" },
  { label: "Depth h, m", input: "depth" },
  { label: "Conductivity <i>C</i>, mS/cm", input: "conductivity" },
  { label: "Conductivity ratio <i>R</i>", input: "rconductivity" },
  { label: "", input: "" },
  { label: "Latitude <i>φ</i>, DD°MM'SS.s N|S", input: "latitude" },
  { label: "Longitude <i>λ</i>, DDD°MM'SS.s E|W", input: "longitude" },
];

const myvars = [
    { label: `Pressure <i>p</i>, dbar`, input: "pressure1", tab: 1 },
    { label: "Depth h, m", input: "depth", tab: 1 },
    { label: "Density <i>ρ</i>, kg/m<sup><i>3</i></sup><font size='-2'>(-1000)</font>", input: "density", tab: 1 },
    { label: "Practical Salinity(<i>C</i>) <i>S</i><sub>p</sub>", input: "salinity1", tab: 1 },
    { label: "Practical Salinity(<i>R</i>) <i>S</i><sub>p</sub>", input: "salinity2", tab: 1 },
    { label: "Potential Temperature <i>θ</i>, °C", input: "ptemperature1", tab: 1 },
    { label: "Sound speed <i>c</i>, m/s", input: "soundspeed", tab: 1 },
    { label: "Freezing point <i>t</i><sub>f</sub>, °C", input: "freezingpoint", tab: 1 },
    { label: "Latitude <i>φ</i>, DD.ddd", input: "latitude", tab: 1 },
    { label: "Longitude <i>λ</i>, DDD.ddd", input: "longitude", tab: 1 },
    { label: "Coriolis frequency, 10<sup>-4</sup> s<sup>-1</sup>", input: "coriolis1", tab: 1 },
    { label: "Coriolis period, hours", input: "coriolis2", tab: 1 },


    { label: "Absolute Salinity(<i>S</i><sub>p</sub>) <i>S</i><sub>A</sub>, g/kg ", input: "asalinity1", tab: 2 },
    { label: "Preformed Salinity(Θ) <i>S</i><sub>*</sub>, g/kg ", input: "psalinity1", tab: 2 },
    { label: "Conservative Temperature(t) Θ, °C ", input: "ctemperature1", tab: 2 },
    { label: "Absolute Salinity Anomaly(<i>S</i><sub>p</sub>) <i>δS</i><sub>A</sub>, g/kg  ", input: "deltaSA_from_SP", tab: 2 },
    { label: "Reference Salinity(<i>S</i><sub>p</sub>) <i>S</i><sub>R</sub>, g/kg  ", input: "rsalinity1", tab: 2 },
    { label: "Practical Salinity(<i>S</i><sub>R</sub>) <i>S</i><sub>p</sub>", input: "salinity3", tab: 2 },
    { label: "Practical Salinity(<i>S</i><sub>A</sub>) <i>S</i><sub>p</sub>", input: "salinity4", tab: 2 },
    { label: "Preformed Salinity(<i>S</i><sub>A</sub>) <i>S</i><sub>*</sub>, g/kg", input: "Sstar_from_SA", tab: 2 },
    { label: "Practical Salinity(<i>S</i><sub>*</sub>) <i>S</i><sub>p</sub>, g/kg", input: "salinity5", tab: 2 },
    { label: "Absolute Salinity(<i>S</i><sub>*</sub>) <i>S</i><sub>A</sub>, g/kg", input: "asalinity2", tab: 2 },
    { label: "Conservative Temperature(<i>θ</i>) Θ, °C", input: "CT_from_pt", tab: 2 },
    { label: "Potential Temperature(Θ) <i>θ</i>, °C", input: "pt_from_CT", tab: 2 },
    { label: "Potential Temperature(p = 0 dbar) <i>θ</i>, °C", input: "pt0_from_t", tab: 2 },
    // { label: "potential temperature, °C", input: "pt_from_t", tab: 2 },

    { label: "Density <i>ρ</i>, kg/m<sup><i>3</i></sup>", input: "rho", tab: 3 },
    { label: "Thermal expansion coefficient(Θ) <i>α</i><sup>Θ</sup>, 1/K", input: "alpha", tab: 3 },
    { label: "Saline contraction coefficient(Θ) <i>β</i><sup>Θ</sup>, kg/g", input: "beta", tab: 3 },
    { label: "Specific volume <i>v</i>, m<sup><i>3</i></sup>/kg", input: "specvol", tab: 3 },
    // { label: "specific volume anomaly , m<sup><i>3</i></sup>/kg", input: "specvol_anom", tab: 3 },
    { label: "Sound speed <i>c</i>, m/s", input: "sound_speed", tab: 3 },
    { label: "Specific internal energy <i>u</i>, J/kg ", input: "internal_energy", tab: 3 },
    { label: "Specific enthalpy <i>h</i>, J/kg ", input: "enthalpy", tab: 3 },
    { label: "Dynamic enthalpy <i>h-h</i><sup>0</sup>, J/kg ", input: "dynamic_enthalpy", tab: 3 },
    { label: "Freezing point(Θ) <i>Θ</i><sub>f</sub>, °C", input: "CT_freezing", tab: 3 },
    { label: "Freezing point(t) <i>t</i><sub>f</sub>, °C", input: "t_freezing", tab: 3 },
    { label: "Latent heat of melting <i>L</i><sup>WI</sup><sub><i>p</i></sub>, J/kg ", input: "latentheat_melting", tab: 3 },
    { label: "Latent heat of evaporation(Θ) <i>L</i><sup>VW</sup><sub><i>p</i></sub>(<i>Θ</i>), J/kg ", input: "latentheat_evap_ct", tab: 3 },
    { label: "Latent heat of evaporation(t) <i>L</i><sup>VW</sup><sub><i>p</i></sub>(<i>t</i>), J/kg ", input: "latentheat_evap_t", tab: 3 },



    { label: "In-situ density <i>ρ</i>, kg/m<sup><i>3</i></sup>", input: "rho_t_exact", tab: 4 },
    { label: "Potential density <i>ρ</i><sup><i>θ</i></sup>, kg/m<sup><i>3</i></sup>", input: "pot_rho_t_exact", tab: 4 },
    { label: "Thermal expansion coefficient(t) <i>α</i><sup>t</sup>, 1/K ", input: "alpha_wrt_t_exact", tab: 4 },
    { label: "Saline contraction coefficient(t) <i>β</i><sup>t</sup>, kg/g  ", input: "beta_const_t_exact", tab: 4 },
    { label: "Specific volume <i>v</i>, m<sup><i>3</i></sup>/kg", input: "specvol_t_exact", tab: 4 },
    { label: "Sound speed <i>c</i>, m/s", input: "sound_speed_t_exact", tab: 4 },
    { label: "Iisentropic compressibility <i>κ</i>, 1/Pa", input: "kappa_t_exact", tab: 4 },
    { label: "Specific enthalpy <i>h</i>, J/kg ", input: "enthalpy_t_exact", tab: 4 },
    { label: "Specific entropy <i>η</i>, J/(kg*K) ", input: "entropy_from_t", tab: 4 },
    { label: "Isobaric heat capacity <i>c</i><sub><i>p</i></sub>, J/(kg*K) ", input: "cp_t_exact", tab: 4 },

  ];
  //
  // places - количество знаков после точки
  // selectplus - результаты расчета добавляются к списку выбираемых данных из таблицы
  //
  const zavisim = [
    { name: "pressure1", alias: "pressure",
      // params: ["depth", "_ilato", 0], funcname: "p_from_z", places: 3, num: true, selectplus: true, blacklist: "depth", convonly: false },
      params: ["depth", "latitude", 0], funcname: "p_from_z", places: 3, num: true, selectplus: true, blacklist: "depth", convonly: false,
      description:`Calculates sea pressure from depth in meters`
    },
    { name: "depth", alias: "depth",
      params: ["pressure", "latitude", 0], funcname: "z_from_p", places: 3, num: true, selectplus: false, blacklist: "pressure1", convonly: false,
      description:`Calculates depth in meters from pressure in dbars`
    },
    { name: "density", alias: "density",
      params: ["temperature","salinity",  "pressure"], funcname: "sigmat", places: 3, num: true, selectplus: false, blacklist: "" , convonly: false,
      description:`Calculates density from salinity, temperature, and pressure`
    },
    { name: "salinity1", alias: "salinity",
      params: ["temperature", "conductivity", "pressure"], funcname: "salinity", places: 3, num: true, selectplus: true, blacklist: "", convonly: false,
      description:`Calculates salinity from temperature, conductivity, and pressure, the input values of conductivity need to be in units of mS/cm (not S/m)!`
    },
    { name: "salinity2", alias: "salinity",
      params: ["temperature", "rconductivity"], funcname: "salinity", places: 3, num: true, selectplus: true, blacklist: "", convonly: false ,
      description:`Calculates salinity from conductivity ratio`
    },
    { name: "ptemperature1", alias: "ptemperature",
      params: ["temperature","salinity",  "pressure",0], funcname: "pottemp", places: 3, num: true, selectplus: true, blacklist: "", convonly: false ,
      description:`Calculates potential temperature with reference pressure`
    },
    
    { name: "soundspeed", alias: "soundspeed",
      params: ["temperature", "salinity",  "pressure"], funcname: "soundspeed", places: 3, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the speed of sound in seawater in m/s`
    },
    { name: "freezingpoint", alias: "freezingpoint",
      params: ["salinity", "pressure"], funcname: "freezepoint", places: 3, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the temperature at which seawater freezes`
    },
    { name: "latitude", alias: "latitude",
      params: ["latitude"], funcname: "decimaldegree", places: 6, num: false, selectplus: false,  blacklist: "", convonly: true,
      description:`Convert degrees, minutes, seconds to decimal degrees`
    },
    { name: "longitude", alias: "longitude",
      params: ["longitude"], funcname: "decimaldegree", places: 6, num: false, selectplus: false, blacklist: "", convonly: true,
      description:`Convert degrees, minutes, seconds to decimal degrees`
    },
    { name: "coriolis1", alias: "coriolis",
      params: ["latitude",1], funcname: "coriolis", places: 3, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Compute the Coriolis frequency in 10-4 s-1 units`
    },
    { name: "coriolis2", alias: "coriolis",
      params: ["latitude",2], funcname: "coriolis", places: 3, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Compute the Coriolis period in hours`
    },

      // 
    { name: "asalinity1", alias: "asalinity",
      params: ["salinity","pressure","longitude","latitude"], funcname: "TEOS10.gsw_sa_from_sp", places: 4, num: true, selectplus: true, blacklist: "", convonly: false,
      description:`Calculates Absolute Salinity from Practical Salinity`
    },
    { name: "psalinity1", alias: "psalinity",
      params: ["salinity","pressure","longitude","latitude"], funcname: "TEOS10.gsw_sstar_from_sp", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates Preformed Salinity from Practical Salinity`
    },
    { name: "ctemperature1", alias: "ctemperature",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_ct_from_t", places: 4, num: true, selectplus: true, blacklist: "", convonly: false,
      description:`Calculates Conservative Temperature of seawater from in-situ temperature`
    },
    { name: "deltaSA_from_SP", alias: "deltaSA_from_SP",
      params: ["salinity","pressure","longitude","latitude"], funcname: "TEOS10.gsw_deltasa_from_sp", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the Absolute Salinity Anomaly from Practical Salinity`
    },
    { name: "rsalinity1", alias: "rsalinity",
      params: ["salinity"], funcname: "TEOS10.gsw_sr_from_sp", places: 4, num: true, selectplus: true, blacklist: "salinity3", convonly: false,
      description:`Calculates Reference Salinity from Practical Salinity`
    },
    { name: "salinity3", alias: "salinity",
      params: ["rsalinity"], funcname: "TEOS10.gsw_sp_from_sr", places: 4, num: true, selectplus: true, blacklist: "rsalinity1", convonly: false,
      description:`Calculates Practical Salinity from Reference Salinity`
    },
    { name: "salinity4", alias: "salinity",
      params: ["asalinity","pressure","longitude","latitude"], funcname: "TEOS10.gsw_sp_from_sa", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculate Practical Salinity from Absolute Salinity, pressure, longitude, and latitude`
    },
    { name: "Sstar_from_SA", alias: "Sstar_from_SA",
      params: ["asalinity","pressure","longitude","latitude"], funcname: "TEOS10.gsw_sstar_from_sa", places: 4, num: true, selectplus: false, blacklist: "asalinity2", convonly: false,
      description:`Calculate Preformed Salinity from Absolute Salinity, pressure, longitude, and latitude`
    },
    { name: "salinity5", alias: "salinity",
      params: ["psalinity","pressure","longitude","latitude"], funcname: "TEOS10.gsw_sp_from_sstar", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates Practical Salinity from Preformed Salinity, pressure, longitude, and latitude`
    },
    { name: "asalinity2", alias: "asalinity",
      params: ["psalinity","pressure","longitude","latitude"], funcname: "TEOS10.gsw_sa_from_sstar", places: 4, num: true, selectplus: false, blacklist: "Sstar_from_SA", convonly: false,
      description:`Calculate Absolute Salinity from Preformed Salinity, pressure, longitude, and latitude`
    },
    { name: "CT_from_pt", alias: "CT_from_pt",
      params: ["asalinity","ptemperature"], funcname: "TEOS10.gsw_ct_from_pt", places: 4, num: true, selectplus: false, blacklist: "pt_from_CT", convonly: false,
      description:`Calculates Conservative Temperature of seawater from potential temperature`
    },
    { name: "pt_from_CT", alias: "pt_from_CT",
      params: ["asalinity","ctemperature"], funcname: "TEOS10.gsw_pt_from_ct", places: 4, num: true, selectplus: false, blacklist: "CT_from_pt", convonly: false,
      description:`Calculates potential temperature (with a reference sea pressure of zero dbar) from Conservative Temperature`
    },
    { name: "pt0_from_t", alias: "pt0_from_t",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_pt0_from_t", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates potential temperature with reference pressure, pr = 0 dbar`
    },
    // { name: "pt_from_t",
    //   params: ["asalinity","temperature","pressure","rpressure"], funcname: "TEOS10.gsw_pt_from_t", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false},

    { name: "rho", alias: "rho",
      params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_rho", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates in-situ density from Absolute Salinity and Conservative Temperature`
    },
    { name: "alpha", alias: "alpha",
      params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_alpha", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the thermal expansion coefficient of seawater with respect to Conservative Temperature`
    },
    { name: "beta", alias: "beta",
      params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_beta", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates the saline (i.e. haline) contraction coefficient of seawater`
    },
    { name: "specvol", alias: "specvol",
      params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_specvol", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates specific volume from Absolute Salinity, Conservative Temperature and pressure`
    },
    // { name: "specvol_anom",
    //   params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_specvol_anom", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false},
    { name: "sound_speed", alias: "sound_speed",
      params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_sound_speed", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the speed of sound in seawater`
    },
    { name: "internal_energy", alias: "internal_energy",
      params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_internal_energy", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the specific internal energy of seawater`
    },
    { name: "enthalpy", alias: "enthalpy",
      params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_enthalpy", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates specific enthalpy of seawater`
    },
    { name: "dynamic_enthalpy", alias: "dynamic_enthalpy",
      params: ["asalinity","ctemperature","pressure"], funcname: "TEOS10.gsw_dynamic_enthalpy", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates dynamic enthalpy of seawater using the computationally`
    },
    { name: "t_freezing", alias: "t_freezing",
      params: ["asalinity","pressure",0], funcname: "TEOS10.gsw_t_freezing", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates the in-situ temperature at which seawater freezes`
    },
    { name: "CT_freezing", alias: "CT_freezing",
      params: ["asalinity","pressure",0], funcname: "TEOS10.gsw_ct_freezing", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates the Conservative Temperature at which seawater freezes`
    },
    { name: "latentheat_melting", alias: "latentheat_melting",
      params: ["asalinity","pressure"], funcname: "TEOS10.gsw_latentheat_melting", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates latent heat, or enthalpy, of melting. It is defined in terms of Absolute Salinity and sea pressure`
    },
    { name: "latentheat_evap_ct", alias: "latentheat_evap_ct",
      params: ["asalinity","ctemperature"], funcname: "TEOS10.gsw_latentheat_evap_ct", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates latent heat of evaporation of water from seawater (isobaric evaporation enthalpy) with Conservative Temperature as input temperature`
    },
    { name: "latentheat_evap_t", alias: "latentheat_evap_t",
      params: ["asalinity","temperature"], funcname: "TEOS10.gsw_latentheat_evap_t", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates latent heat of evaporation of water from seawater (isobaric evaporation enthalpy) with in-situ temperature`
    },
 
    { name: "rho_t_exact", alias: "rho_t_exact",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_rho_t_exact", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates in-situ density of seawater from Absolute Salinity and in-situ temperature`
    },
    { name: "pot_rho_t_exact", alias: "pot_rho_t_exact",
      params: ["asalinity","temperature","pressure",0], funcname: "TEOS10.gsw_pot_rho_t_exact", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates potential density of seawater`
    },
    { name: "alpha_wrt_t_exact", alias: "alpha_wrt_t_exact",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_alpha_wrt_t_exact", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the thermal expansion coefficient of seawater with respect to in-situ temperature`
    },
    { name: "beta_const_t_exact", alias: "beta_const_t_exact",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_beta_const_t_exact", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the saline contraction coefficient of seawater at constant in-situ temperature`
    },
    { name: "specvol_t_exact", alias: "specvol_t_exact",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_specvol_t_exact", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates specific volume from Absolute Salinity, temperature and pressure`
    },
    { name: "sound_speed_t_exact", alias: "sound_speed_t_exact",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_sound_speed_t_exact", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the speed of sound in seawater`
    },
    { name: "kappa_t_exact", alias: "kappa_t_exact",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_kappa_t_exact", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the isentropic compressibility of seawater`
    },
    { name: "enthalpy_t_exact", alias: "enthalpy_t_exact",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_enthalpy_t_exact", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the specific enthalpy of seawater`
    },
    { name: "entropy_from_t", alias: "entropy_from_t",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_entropy_from_t", places: 4, num: true, selectplus: false, blacklist: "",  convonly: false,
      description:`Calculates specific entropy given Absolute Salinity, in-situ temperature and pressure`
    },
    { name: "cp_t_exact", alias: "cp_t_exact",
      params: ["asalinity","temperature","pressure"], funcname: "TEOS10.gsw_cp_t_exact", places: 4, num: true, selectplus: false, blacklist: "", convonly: false,
      description:`Calculates the isobaric heat capacity of seawater`
    },
  ];

  selstatus = {}
    myvars.forEach((element) => {
      selstatus[element.input] = null
    })
  
  depstatus = {}  
  newdepstatus ={}
  
  addstatus = {}
  mydata.forEach((element) => {
    addstatus[element.input] = "..."
  })
  addstatus["_ilato"] = 58.6;
  addstatus["_ilono"] = 20.4;
  addstatus["latitude"] = 58.6;
  addstatus["longitude"] = 20.4;

  
  
  counters = {}
  mydata.forEach((element) => {
    counters[element.input] = 0
  })
  
  // let htmltitle="Oceanography calculator"
  // let htmlheader1="Thermodynamics and Equation of State of Seawater Calculator ·"
  // let htmlheader2="Oceanography calculator · EOS-80 · TEOS-10 ·"
  // let htmlfname="Select file"
  // let htmlvarsheader="Calculated parameters and their headers"
  // let htmlvars1="EOS-80"
  // let htmlvars2="Salinity and Temperature"
  // let htmlvars3="Density and Enthalpy"
  // let htmlvars4="Thermodynamics"
  // let htmldatasheader="Initial data from the loaded table"
  // let htmlilato="Latitude"
  // let htmlilono="Longitude"
  // let htmlcopyright="Berezhinskii O."
  // let htmltotallines ="Total lines - "
  // let htmlwarning1 = "The file is not selected or its format is not supported!"
  // let htmlwarning2 = "No parameters selected for calculation!" //"Не выбраны параметры для расчета"
  // let htmlwarning3 = "Data required for calculation not selected!" //"Не выбраны необходимые для расчета данные"
  // let htmlwarning5 = "Calculation done" //"Расчет выполнен"
  // let diagramtitle = "Diagrams"
  // let tsdiagramtitle = "T-S diagram"
  // let diagramstitle = "Salinity <i>S</i><sub>p</sub>, g/kg"
  // let diagramttitle = "Temperature <i>t</i> ,°C"
  // let diagramptitle = "Pressure <i>p</i>, dbar"
  // let diagramdtitle = "Pressure <i>p</i>, dbar"
  // let diagramxtitle = "x-axis"
  // let diagramxntitle = "x-axis"
  // let diagramytitle = "y-axis"
  // let dddiagramtitle = "Level charts"
  // let ccdiagramtitle = "Custom chart"

  // document.getElementById("htmltitle").innerText = htmltitle;
  // document.getElementById("htmlheader1").innerText = htmlheader1;
  // document.getElementById("htmlheader2").innerText = htmlheader2;
  // document.getElementById("htmlfname").innerText = htmlfname;
  // document.getElementById("htmlvarsheader").innerText = htmlvarsheader;
  // document.getElementById("htmlvars1").innerText = htmlvars1;
  // document.getElementById("htmlvars2").innerText = htmlvars2;
  // document.getElementById("htmlvars3").innerText = htmlvars3;
  // document.getElementById("htmlvars4").innerText = htmlvars4;
  // document.getElementById("htmldatasheader").innerText = htmldatasheader;
  // // document.getElementById("htmlilato").innerText = htmlilato;
  // // document.getElementById("htmlilono").innerText = htmlilono;
  // document.getElementById("htmlcopyright").innerText = htmlcopyright;

  // document.getElementById("diagramtitle").innerText = diagramtitle;
  // document.getElementById("diagramtitlep").innerText = diagramtitle;
  // document.getElementById("graphtitlets").value = tsdiagramtitle;
  // document.getElementById("stitle").value = diagramstitle;
  // document.getElementById("ttitle").value = diagramttitle;
  // document.getElementById("ptitle").value = diagramptitle;
  // document.getElementById("dtitle").value = diagramdtitle;
  // document.getElementById("xtitle").value = diagramxtitle;
  // document.getElementById("ytitle").value = diagramytitle;
  // document.getElementById("graphtitledd").value = dddiagramtitle;
  // document.getElementById("graphtitlecc").value = ccdiagramtitle;
  // document.getElementById("x1title").value = diagramxntitle+"1";

  // let ssaall = document.querySelector("#ssaall");
  // ssaall.innerHTML +=  `
  // <input class="stitle" id="stitle" type="text" value='${diagramstitle}'/>
  //               <select class="graphselect" id="sid" name="sname">
  //                 <option>...</option>
  //               </select>`

  
  
 
  
  
  