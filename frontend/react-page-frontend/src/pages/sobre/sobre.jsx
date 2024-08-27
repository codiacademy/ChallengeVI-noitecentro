import { Header } from "../../pages/header/header.jsx";
import { Footer } from "../footer/footer.jsx";
import aboutImg from "../../assets/images/about.png";
import "./sobre.css";

export function Sobre() {
    return (
        <div className="sobre-body">
            <Header />

            <div className="sobre-container">
                <div className="sobre-content">
                    <h1 className="sobre-title">Sobre Nós</h1>

                    <div className="sobre-text-container">
                        <p className="top-text">
                            Somos uma empresa de Software que nasceu para ir além de “apenas entregar um projeto”. Criamos uma estrutura operacional baseada em organização, agilidade, transparência, colaboração e metodologias ágeis bem definidas.
                        </p>

                        <p className="bottom-text">
                            Não é sobre desenvolvimento, é sobre o real envolvimento. É sobre idealizar e lapidar, não “apenas entregar”. É sobre contribuir diretamente para que o potencial máximo de cada projeto seja explorado!
                        </p>

                        <div className="image-text-container">
                            <div className="image-sobre">
                                <img src={aboutImg} alt="imagem sobre nós" />
                            </div>

                            <div className="side-text">
                                <p>
                                    É com grande satisfação que nos destacamos como uma referência incontestável no mercado de tecnologia. Desde a sua fundação, a Magic tem continuamente superado expectativas e estabelecido novos padrões de excelência e inovação.
                                </p>

                                <p>
                                    Com uma visão estratégica e um compromisso inabalável com a qualidade, a Magic não apenas conquistou uma posição de liderança, mas também influenciou positivamente o setor de desenvolvimento de software. Seus produtos e serviços excepcionais não apenas atendem às necessidades dos clientes, mas também definem tendências e inspiram concorrentes.
                                </p>

                                <p>
                                    Acreditamos que o verdadeiro impacto vem de uma combinação única de expertise técnica e uma compreensão profunda dos desafios enfrentados por nossos parceiros. Com uma abordagem personalizada e flexível, entregamos resultados que vão além das expectativas, reforçando nosso compromisso com a excelência e com a construção de um futuro tecnológico ainda mais promissor.
                                </p>


                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}