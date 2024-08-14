import { Header } from "../header/header.jsx";

import "./home.css"

export function Home(){

    return (
        <div>
            <Header/>
            <h1>Home</h1>
        </div>
    )
}

import React from 'react';

function MyComponent() {
  return (
    <>
      <div className="idps">
        <h1>INOVAÇÃO DIGITAL E PERSONALIZADA PARA O SEU SUCESSO</h1>
        <p>
          Não é apenas sobre desenvolvimento de software, é sobre envolvimento! Buscamos entender suas necessidades nos mínimos detalhes para oferecer soluções que realmente façam sentido, desde o primeiro contato até a entrega final.
        </p>
        <input type="button" value="acesse" />
      </div>

      <div className="sn">
        <h1>Sobre nós</h1>
        <img src="aula4/nos.jpeg" alt="" />
        <p>
          Somos uma empresa de Software que nasceu para ir além de “apenas entregar um projeto”. Criamos uma estrutura operacional baseada em organização, agilidade, transparência, colaboração e metodologias ágeis bem definidas. ‍Não é sobre desenvolvimento, é sobre o real envolvimento. É sobre idealizar e lapidar, não “apenas entregar”. É sobre contribuir diretamente para que o potencial máximo de cada projeto seja explorado!
        </p>
        <p>
          É com grande satisfação que nos destacamos como uma referência incontestável no mercado de tecnologia. Desde a sua fundação, a Magic, tem continuamente superado expectativas e estabelecido novos padrões de excelência e inovação.
        </p>
        <p>
          Com uma visão estratégica e um compromisso inabalável com a qualidade, a Magic não apenas conquistou uma posição de liderança, mas também influenciou positivamente o setor de desenvolvimento de software. Seus produtos e serviços excepcionais não apenas atendem às necessidades dos clientes, mas também definem tendências e inspiram concorrentes.
        </p>
      </div>
    </>
  );
}

export default MyComponent;





