const Binance = require("node-binance-api");


// |||||||||| CONFIGURAÇÃO DE INTERVALO DE VELA E PAR DE MOEDA |||||||||||||||||||||||

var intervalo = "15m";
var par = "LINKUSDT";

//const binance = new Binance().options();

// API DE PRODUÇÃO
const  binance = new Binance().options({
  APIKEY: 'YOUR_API_KEY',
  APISECRET: 'YOUR_API_SECRET',
  'recvWindow': 60000
});

// API DE TESTE
/*
var binance = new Binance().options({
    APIKEY: 'YOUR_API_KEY_TEST',
    APISECRET: 'YOUR_API_SECRET_TEST',
    //'recvWindow': 60000,
    verbose: true,
    urls: {
       base: 'https://testnet.binance.vision/api/',
       //combineStream: 'wss://testnet.binance.vision/stream?streams=',
       //stream: 'wss://testnet.binance.vision/ws/'
    }
  });

  */

//-------- ^ FIM DO BLOCO DE CONFIGURAÇÕES DA CORRETORA -------------------------

//------------------------- INICIO DA ESTRATEGIA---------------------------------



binance.websockets.chart(par, intervalo, (symbol, interval, chart) => {
  let tick = binance.last(chart);
  const last = chart[tick];

  let ohlc = binance.ohlc(chart);
  let volumes = ohlc.volume;
  


  // CONVERTENDO OS DADOS DAS VELAS OHLC PARA HEIKIN-ASHI
  let closes = ohlc.close;
  let opens = ohlc.open;
  let highs = ohlc.high;
  let lows = ohlc.low;
  let heikinAshiCloses = [];
  let heikinAshiOpens = [];
  let heikinAshiHighs = [];
  let heikinAshiLows = [];
  
  for(let i = 0; i < closes.length; i++) {
    const haClose = (opens[i] + highs[i] + lows[i] + closes[i]) / 4;
    heikinAshiCloses.push(haClose);
  }
  
  for(let i = 0; i < opens.length; i++) {
    if(i === 0) {
      heikinAshiOpens.push(opens[i]);
    } else {
      const haOpen = (heikinAshiOpens[i-1] + heikinAshiCloses[i-1]) / 2;
      heikinAshiOpens.push(haOpen);
    }
  }
  
  for(let i = 0; i < highs.length; i++) {
    const haHigh = Math.max(highs[i], heikinAshiOpens[i], heikinAshiCloses[i]);
    heikinAshiHighs.push(haHigh);
  }
  
  for(let i = 0; i < lows.length; i++) {
    const haLow = Math.min(lows[i], heikinAshiOpens[i], heikinAshiCloses[i]);
    heikinAshiLows.push(haLow);
  }

  //A PARTIR DAQUI, PEGAMOS ALGUMAS VELAS PARA CRIAR A ESTRATEGIA
  
  // Pegando dados da vela Atual (-1)
  const haOpen1 = heikinAshiOpens[heikinAshiOpens.length - 1];
  const haHigh1 = heikinAshiHighs[heikinAshiHighs.length - 1];
  const haLow1 = heikinAshiLows[heikinAshiLows.length - 1];
  const haClose1 = heikinAshiCloses[heikinAshiCloses.length - 1];
 
  // Pegando Dados da Vela anterior (-2)
  const haOpen2 = heikinAshiOpens[heikinAshiOpens.length - 2];
  const haHigh2 = heikinAshiHighs[heikinAshiHighs.length - 2];
  const haLow2 = heikinAshiLows[heikinAshiLows.length - 2];
  const haClose2 = heikinAshiCloses[heikinAshiCloses.length - 2];

  
  // Pegando Dados da Vela anterior (-3)
  const haOpen3 = heikinAshiOpens[heikinAshiOpens.length - 3];
  const haHigh3 = heikinAshiHighs[heikinAshiHighs.length - 3];
  const haLow3 =  heikinAshiLows[heikinAshiLows.length - 3];
  const haClose3 = heikinAshiCloses[heikinAshiCloses.length - 3];
  
  // Pegando Dados da Vela anterior (-4)
  const haOpen4 = heikinAshiOpens[heikinAshiOpens.length - 4];
  const haHigh4 = heikinAshiHighs[heikinAshiHighs.length - 4];
  const haLow4 = heikinAshiLows[heikinAshiLows.length - 4];
  const haClose4 = heikinAshiCloses[heikinAshiCloses.length - 4];
  
  // Pegando Dados da Vela anterior (-5)
  const haOpen5 = heikinAshiOpens[heikinAshiOpens.length - 5];
  const haHigh5 = heikinAshiHighs[heikinAshiHighs.length - 5];
  const haLow5 = heikinAshiLows[heikinAshiLows.length - 5];
  const haClose5 = heikinAshiCloses[heikinAshiCloses.length - 5];
  
  // Pegando Dados da Vela anterior (-6)
  const haOpen6 = heikinAshiOpens[heikinAshiOpens.length - 6];
  const haHigh6 = heikinAshiHighs[heikinAshiHighs.length - 6];
  const haLow6 = heikinAshiLows[heikinAshiLows.length - 6];
  const haClose6 = heikinAshiCloses[heikinAshiCloses.length - 6];
  
  // Pegando Dados da Vela anterior (-7)
  const haOpen7 = heikinAshiOpens[heikinAshiOpens.length - 7];
  const haHigh7 = heikinAshiHighs[heikinAshiHighs.length - 7];
  const haLow7 = heikinAshiLows[heikinAshiLows.length - 7];
  const haClose7 = heikinAshiCloses[heikinAshiCloses.length - 7];

  // A PARTIR DAQUI, PEGAMOS DADOS DE VOLUMES FINANCEIRO PARA CONFIRMAÇÃO DE ENTRADA  
  const volume2 = volumes[volumes.length - 2];
  const volume3 = volumes[volumes.length - 3];
  
  // AQUI FICA A ESTRATEGIA DE COMPRA
  estrategia = haClose5 < haOpen5 && haClose4 <= haOpen4 && haClose3 <= haOpen3 && haClose2 > haOpen2 && volume2 > volume3;

});

//AQUI FICA A FUNÇÃO DE COMPRA
function comprar(){
    
}

//FUNÇÃO PARA VERIFICAR ESTRATEGIA
function verificar() {
  
  if (estrategia === true) {    
    comprar(); 

  } else{  
    console.log("Sem sinal de entrada")
    console.log(estrategia)
    if(estrategia === false){
        console.log("Sim é examente igual a false ")
    }
  }
} setInterval(verificar, 16000);

