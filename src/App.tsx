import { useState, useEffect } from 'react';
import BgMain from './assets/bg-main-desktop.png';
import CataoFront from './assets/bg-card-front.png';
import CartaoBack from './assets/bg-card-back.png';
import IconComplete from './assets/icon-complete.svg';
import './App.css';

function App() {

  const [numCartao, setNumCartao] = useState("0000 0000 0000 0000")
  const [nome, setNome] = useState("Jane Appleseed")
  const [ano, setAno] = useState("");
  const [mes, setMes] = useState("");
  const [cvc, setCvc] = useState("000");
  var data = mes +"/"+ ano;

  const [errorNome, setErrosNome] = useState(false);
  const [errorCatao, setErrorCartao] = useState(false);
  const [errorMes, setErrorMes] = useState(false);
  const [errorAno, setErrorAno] = useState(false);
  const [errorCVC, setErrorCVC] = useState(false);

  const [cadastrado, setCadastrado] = useState(false);
  

  function SetNum(num:string) {
    if (num === "") {
      setNumCartao("0000 0000 0000 0000");
    }
    else{
      var n1 = num.slice(0,4);
      var n2 = num.slice(4,8);
      var n3 = num.slice(8,12);
      var n4 = num.slice(12,16);
      setNumCartao(n1 +" "+ n2 +" "+ n3 +" "+ n4);
    }
  }

  useEffect(() => {
    if (nome === "") {
      setNome("Jane Appleseed");
    }
    if (mes === "") {
      setMes("00");
    }
    if (ano === "") {
      setAno("00");
    }
    if (cvc === "") {
      setCvc("000");
    }
  }, [nome, mes, ano, cvc])
  

  const revisarDados = () => {
      var novoCartao = numCartao.replaceAll(" ", "");
      var cartaoCover = parseInt(novoCartao);
      var passe = false;
      
      if (novoCartao.length !== 16) {
        if (novoCartao !== cartaoCover.toString()) {
          setErrorCartao(true);
        }
        setErrorCartao(true);
      }else{setErrorCartao(false)}
      if (parseInt(mes) > 12 || mes.length !== 2 ) {
        setErrorMes(true)
      }else{setErrorMes(false)}
      if (ano.length !== 2) {
        setErrorAno(true)
      }else{setErrorAno(false)}
      if (cvc.length !== 3) {
        setErrorCVC(true)
      }else{setErrorCVC(false)}

      veriFinal();
  }

  const veriFinal = () => {
    if (errorAno === false && errorCVC === false && errorCatao === false) {
      setCadastrado(true);
    }
  }
  

  return (
    <div className='container'>
      <img 
        alt='imagem main' 
        className='bg-main' 
      />
      <div className='cartao c1'>
        <img 
          src={CataoFront}
          alt='cartao front'
          className='front'
        />
        <div className="conteudo-cartao">
          <div className='header-cartao'>
            <div />
            <div />
          </div>
          <div className='dados'>
            <div className='num-cartao'>
              <p>{numCartao}</p>
            </div>
            <div className='nome-cvc'>
              <p>{nome}</p>
              <p>{data}</p>
            </div>
        </div>
        </div>
      </div>

      <div className='cartao c2'>
        <img 
          src={CartaoBack}
          alt='cartao back'
          className='back'
        />
        <p>{cvc}</p>
      </div>

      <main className="formulario">
        {cadastrado ?
           <div className='complete'>
            <img src={IconComplete} />
            <div>
              <h1>Thank You!</h1>
              <p>We've added your card details</p>
            </div>
            <a>Continue</a>
           </div>
        :
          <form name='dados'>
            <fieldset>
              <div>
              <legend>Cardholder name</legend>
              <input placeholder='e.g. Jane Appleseed' 
                onChange={(e) => setNome(e.currentTarget.value)}
              />

              </div>
            </fieldset>
            <fieldset>
              <legend>Card number</legend>
              <input placeholder='e.g. 1234 5678 9123 0000' 
                className={errorCatao ? "erro" : ""}
                maxLength={16}
                onChange={(e) => SetNum(e.currentTarget.value)}
              />
              {errorCatao ? 
                <p>Wrong format, number only</p>
              : null}
            </fieldset>
            <div className='data-cvc'>
              <fieldset className='data'>
                <legend>exp. date (mm/yy)</legend>
                <div className='container-datas'>
                  <input placeholder='MM' 
                    maxLength={2}
                    className={errorMes ? "erro" : ""}
                    onChange={(e) => setMes(e.currentTarget.value)}
                  />
                  <input placeholder='YY' 
                    maxLength={2}
                    className={errorAno ? "erro" : ""}
                    onChange={(e) => setAno(e.currentTarget.value)}
                  />
                </div>
                {errorAno || errorMes ? 
                  <p>Cant's be blank</p>
                : null}
              </fieldset>
              <fieldset className='cvc'>
                <legend>cvc</legend>
                <input placeholder='e.g. 123' 
                  maxLength={3}
                  className={errorCVC ? "erro" : ""}
                  onChange={(e) => setCvc(e.currentTarget.value)}
                />
                {errorCVC ? 
                  <p>Cant's be blank</p>
                : null}
              </fieldset>
            </div>
            <a onClick={revisarDados}>
              Confirm
            </a>
          </form>
        }
      </main>
    </div>
  );
}

export default App;
