/*!
 * system-nl v0.3.0
 * http://gitlab.nlstar.com:9000/nast/system-nl
 */
function SystemNL() {
  var self = this;

  var PV_RATIO = 120;

  /*
  VLOOKUP($H$17;$AC$5:$AF$20;2;0), где
    $H$17 - что искать (qualification),
    $AC$5:$AF$20 - диапазон ячеек (A5CAF20),
    2 - столбец ячеек минус 1 (1),
    0 - значит искать точное значение.
  Получаем:
  A5CAF20[qualification][1]
  */
  var A5CAF20 = {
    R: { 1: 0, 2: 0, 3: 0 },
    M: { 1: 0, 2: 0, 3: 0 },
    AM: { 1: 0, 2: 0, 3: 0 },
    SM: { 1: 1, 2: 0, 3: 0 },
    Mast: { 1: 1, 2: 0, 3: 0 },
    ME: { 1: 1, 2: 0, 3: 0 },
    S: { 1: 1, 2: 0, 3: 0 },
    S1: { 1: 1, 2: 1, 3: 0 },
    S2: { 1: 1, 2: 1, 3: 0 },
    DS: { 1: 1, 2: 1, 3: 1 },
    DT: { 1: 1, 2: 1, 3: 1 },
    DT1: { 1: 1, 2: 1, 3: 1 },
    DT2: { 1: 1, 2: 1, 3: 1 },
    DT3: { 1: 1, 2: 1, 3: 1 },
    DT4: { 1: 1, 2: 1, 3: 1 },
    DT5: { 1: 1, 2: 1, 3: 1 },
  };

  var U23V35 = {
    SM: 3,
    Mast: 7,
    ME: 14,
    S: 21,
    S1: 21,
    S2: 21,
    DS: 21,
    DT: 21,
    DT1: 21,
    DT2: 21,
    DT3: 21,
    DT4: 21,
    DT5: 21,
  };

  var N5AA20 = {
    R: { 1: 0, 2: 0, 3: 0 },
    M: { 1: 35, 2: 35, 3: 35 },
    AM: { 1: 70, 2: 70, 3: 70 },
    SM: { 1: 70, 2: 500, 3: 500 },
    Mast: { 1: 70, 2: 1000, 3: 1000 },
    ME: { 1: 70, 2: 2000, 3: 2000 },
    S: { 1: 70, 2: 3000, 3: 3000 },
    S1: { 1: 70, 2: 6000, 3: 3000 },
    S2: { 1: 70, 2: 8000, 3: 2000 },
    DS: { 1: 70, 2: 10000, 3: 1000 },
    DT: { 1: 70, 2: 16000, 3: 1000 },
    DT1: { 1: 70, 2: 23000, 3: 1000 },
    DT2: { 1: 70, 2: 50000, 3: 1000 },
    DT3: { 1: 70, 2: 100000, 3: 500 },
    DT4: { 1: 70, 2: 250000, 3: 500 },
    DT5: { 1: 70, 2: 500000, 3: 0 },
  };

  // Личный объем (ЛО)
  var pv = {
    // Личные покупки в месяц
    personalRub: 0,
    personalPv: 0,

    // Сумма покупок одного клиента
    clientRub: 0,
    clientPv: 0,

    // Количество клиентов в месяц
    numberOfClients: 0,

    // Итого ЛО
    totalPv: 0, // E13
  };

  // Групповой объем (ГО)
  var gv = {
    // Количество менеджеров с покупкой в первой линии
    numberOfManagers: 0, // D17

    // ЛО одного менеджера
    managerPv: 0, // E19
    managerRub: 0,

    // Итого первая линия
    total1stLinePv: 0, // E21

    // Всего ГО
    totalGv: 0, // E23
  };

  // Доход по IDC (у.е.)
  var idc = {
    block1_3: 0,
    block4: 0,
    block5: 0,
    total: 0,
  };

  var xls = {
    // Квалификация
    N5: 'R',
    N6: 'M',
    N7: 'AM',
    N8: 'SM',
    N9: 'Mast',
    N10: 'ME',
    N11: 'S',

    // ГО
    P5: 0,
    P6: 35,
    P7: 70,
    P8: 500,
    P9: 1000,
    P10: 2000,
    P11: 3000,

    // Боковик
    P28: 0,

    // Выплата 1
    O30: 0,
  };

  var qualificationFullName = {
    'R': 'Registration',
    'M': 'Manager',
    'AM': 'Active manager',
    'SM': 'Start manager',
    'Mast': 'Master',
    'ME': 'Master Elite',
    'S': 'Star',
    'S1': '1 Star',
    'S2': '2 Star',
    'DS': 'Diamond Star',
    'DT': 'Diamond Tutor',
    'DT1': 'Diamond Tutor 1',
    'DT2': 'Diamond Tutor 2',
    'DT3': 'Diamond Tutor 3',
    'DT4': 'Diamond Tutor 4',
    'DT5': 'Diamond Tutor 5',
  }

  // Квалификация
  var qualification = ''; // H17

  // Маркетинг-план 1 (Выплаты по первому блоку)
  var marketingPlan1 = 0; // H12=P35

  // Маркетинг-план 2
  var marketingPlan2 = 0; // H13

  // Маркетинг-план 3
  var marketingPlan3 = 0; // H14

  var totalAll = {
    // Итого у.е.
    cu: 0,

    // Итого руб.
    rub: 0,
  };

  // Задаём личный объем
  // {personalRub, clientRub, numberOfClients}
  this.setPersonalVolume = function (data) {
    pv.personalRub = +data.personalRub;
    pv.personalPv = round(pv.personalRub / PV_RATIO);

    pv.clientRub = +data.clientRub;
    pv.clientPv = round(pv.clientRub / PV_RATIO);

    pv.numberOfClients = +data.numberOfClients;

    pv.totalPv = round(pv.personalPv + pv.clientPv * pv.numberOfClients);
  };

  // Получаем все значения личного объёма
  this.getPersonalVolume = function () {
    return pv;
  };

  // Задаём групповой объем
  // {numberOfManagers, managerRub}
  this.setGroupVolume = function (data) {
    gv.numberOfManagers = +data.numberOfManagers;

    gv.managerRub = +data.managerRub;
    gv.managerPv = round(gv.managerRub / PV_RATIO);

    gv.total1stLinePv = round(gv.managerPv * gv.numberOfManagers);

    gv.totalGv = round(gv.total1stLinePv + pv.totalPv);
  };

  // Получаем все значения группового объёма
  this.getGroupVolume = function () {
    return gv;
  };

  // Подсчет IDC
  function calcIdc() {
    // =IF(E13>70;70*0,4+(E13-70)*0,8;E13*0,4)
    if (pv.totalPv > 70) {
      idc.block1_3 = round(70 * 0.4 + (pv.totalPv - 70) * 0.8);
    } else {
      idc.block1_3 = round(pv.totalPv * 0.4);
    }

    // =IF(E13>=200;87*ROUNDDOWN(E13/200;0);0)
    if (pv.totalPv >= 200) {
      idc.block4 = round(87 * Math.floor(pv.totalPv / 200));
    } else {
      idc.block4 = 0;
    }

    // =IF(E13>=70;IF(E19>70;70*D17*0,4;E21*0,4);0)
    if (pv.totalPv >= 70) {
      if (gv.managerPv > 70) {
        idc.block5 = round(70 * gv.numberOfManagers * 0.4);
      } else {
        idc.block5 = round(gv.total1stLinePv * 0.4);
      }
    } else {
      idc.block5 = 0;
    }

    // =SUM(G7:I7)
    idc.total = round(idc.block1_3 + idc.block4 + idc.block5);
  }

  // Получаем все значения IDC
  this.getIDC = function () {
    calcIdc();
    return idc;
  };

  // Вычисление квалификации
  function calcQualification() {
    //=IF(E13<70;"R";IF(E23>=P11;N11;IF(E23>=P10;N10;IF(E23>=P9;N9;IF(E23>=P8;N8;IF(E23>=P7;N7;IF(E23>=P6;N6;N5)))))))
    if (pv.totalPv < 70) qualification = xls.N5;
    else if (gv.totalGv >= xls.P11) qualification = xls.N11;
    else if (gv.totalGv >= xls.P10) qualification = xls.N10;
    else if (gv.totalGv >= xls.P9) qualification = xls.N9;
    else if (gv.totalGv >= xls.P8) qualification = xls.N8;
    else if (gv.totalGv >= xls.P7) qualification = xls.N7;
    else if (gv.totalGv >= xls.P6) qualification = xls.N6;
    else qualification = xls.N5;
  }

  // Получаем квалификацию
  this.getQualification = function () {
    calcQualification();
    return qualificationFullName[qualification];
  };

  // Вычисление Маркетинг-план 1
  function calcMarketingPlan1() {
    // Выплата 1: O30=IF(E13<70;0;VLOOKUP($H$17;$AC$5:$AF$20;2;0))
    if (pv.totalPv < 70) xls.O30 = 0;
    else xls.O30 = A5CAF20[qualification][1];

    // Боковик: P28==VLOOKUP($H$17;$N$5:$AA$20;4;0)
    xls.P28 = N5AA20[qualification][3];

    // Выплаты по первому блоку: P35=IF(O30=1;VLOOKUP(H17;U23:V35;2;0)/100*E23;0)
    if (xls.O30 == 1)
      marketingPlan1 = round(U23V35[qualification] / 100 * gv.totalGv);
    else marketingPlan1 = 0;
  }

  // Получаем Маркетинг-план 1
  this.getMarketingPlan1 = function () {
    calcMarketingPlan1();
    return marketingPlan1;
  };

  // Вычисление общего итога
  function calcTotalAll() {
    totalAll.cu = round(
      idc.total + marketingPlan1 + marketingPlan2 + marketingPlan3
    );

    totalAll.rub = round(totalAll.cu * 40);
  }

  // Получаем общий итог
  this.getTotalAll = function () {
    calcIdc();
    calcQualification();
    calcMarketingPlan1();
    calcTotalAll();
    return totalAll;
  };

  // Utils
  // Округление до сотых
  function round(x) {
    return Math.round(x * 100) / 100;
  }
}


// КАЛЬКУЛЯТОР
if ($('.calculator').length) {
  // сумма твоих личных покупок
  noUiSlider.create($('#personalRub')[0], {
    start: 4148,
    step: 1,
    behaviour: 'snap',
    connect: [true, false],
    range: {
      'min': 0,
      'max': 30000
    },
    format: {
      from: function (value) {
        return parseInt(value);
      },
      to: function (value) {
        return parseInt(value);
      }
    }
  });

  // количество твоих клиентов
  noUiSlider.create($('#numberOfClients')[0], {
    start: 30,
    behaviour: 'snap',
    connect: [true, false],
    range: {
      'min': 0,
      'max': 100
    },
    format: {
      from: function (value) {
        return parseInt(value);
      },
      to: function (value) {
        return parseInt(value);
      }
    }
  });

  // Сумма покупок одного клиента
  noUiSlider.create($('#clientRub')[0], {
    start: 4010,
    behaviour: 'snap',
    connect: [true, false],
    range: {
      'min': 0,
      'max': 30000
    },
    format: {
      from: function (value) {
        return parseInt(value);
      },
      to: function (value) {
        return parseInt(value);
      }
    }
  });

  // Количество партнеров (менеджеров), которых ты привлечешь в бизнес
  noUiSlider.create($('#numberOfManagers')[0], {
    start: 19,
    behaviour: 'snap',
    connect: [true, false],
    range: {
      'min': 0,
      'max': 100
    },
    format: {
      from: function (value) {
        return parseInt(value);
      },
      to: function (value) {
        return parseInt(value);
      }
    }
  });

  // Сумма покупок одного партнера (менеджера) в месяц
  noUiSlider.create($('#managerRub')[0], {
    start: 4148,
    behaviour: 'snap',
    connect: [true, false],
    range: {
      'min': 0,
      'max': 30000
    },
    format: {
      from: function (value) {
        return parseInt(value);
      },
      to: function (value) {
        return parseInt(value);
      }
    }
  });

  // работа с калькулятором
  var systemNl = new SystemNL();

  $('.calculator__range').each(function () {
    var parent = this;
    // вывод значений слайдеров в html
    $('.calculator__range-slider', this)[0].noUiSlider.on('update', function (values, handle) {
      $('.calculator__range-value', parent).html(values[handle].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));

      // личный объём
      var personalRubVal = $('#personalRub')[0].noUiSlider.get();
      var numberOfClientsVal = $('#numberOfClients')[0].noUiSlider.get();
      var clientRubVal = $('#clientRub')[0].noUiSlider.get();
      var managerRubVal = $('#managerRub')[0].noUiSlider.get();

      systemNl.setPersonalVolume({
        personalRub: personalRubVal,
        numberOfClients: numberOfClientsVal,
        clientRub: clientRubVal
      });

      var pv = systemNl.getPersonalVolume();

      $('#personalPv').html(parseInt(pv.personalPv)); // cумма твоих личных покупок в PV
      $('#clientPv').html(parseInt(pv.clientPv)); // cумма покупок одного клиента в PV
      $('#totalPv').html(parseInt(pv.totalPv).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')); // твой личный объём в месяц

      // групповой объём
      var numberOfManagersVal = $('#numberOfManagers')[0].noUiSlider.get();
      var managerRubVal = $('#managerRub')[0].noUiSlider.get();

      systemNl.setGroupVolume({
        numberOfManagers: numberOfManagersVal,
        managerRub: managerRubVal,
      });

      var gv = systemNl.getGroupVolume();
      var all = systemNl.getTotalAll();

      $('#managerPv').html(parseInt(gv.managerPv)); // Сумма покупок одного менеджера в месяц в PV
      $('#totalGv').html(parseInt(gv.totalGv).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')); // твой групповой объем в месяц
      $('#totalRub').html(parseInt(all.rub).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')); // ежемесячный доход
      $('.calculator__qualification').html(systemNl.getQualification()); // квалификация
    });
  })
};