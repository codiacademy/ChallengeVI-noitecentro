import "./servicos.css";
import services1 from "../../assets/images/services1.jpg";
import services2 from "../../assets/images/services2.jpg";
import services3 from "../../assets/images/services3.jpg";

import embrapa from "../../assets/images/embrapa.png";
import zencheck from "../../assets/images/zencheck.png";

import { Header } from "../../pages/header/header";
import { Footer } from "../footer/footer.jsx";


export function Servicos() {
    return (
        <div className="services-body">
            <Header />

            <div className="services-content">
                <h1 className="services-title">Serviços</h1>

                <div className="web">
                    <div className="web-text">
                        <h2 className="web-title">Desenvolvimento Web</h2>

                        <p className="web-description">
                            Nossa equipe é especializada em criar soluções web que combinam design moderno com funcionalidade robusta. Desenvolvemos sites e aplicações responsivas que garantem uma experiência de navegação intuitiva e eficiente, independentemente do dispositivo. Utilizando as mais recentes tecnologias, como React, Angular e Node.js, construímos plataformas escaláveis e seguras, que atendem às necessidades específicas de cada cliente, desde a criação de sites institucionais até sistemas complexos de e-commerce e portais corporativos. Além disso, garantimos a otimização para SEO, proporcionando melhor visibilidade nos mecanismos de busca, e focamos em performances rápidas, garantindo a satisfação do usuário final. Nossos serviços incluem suporte contínuo e atualizações para que seu site esteja sempre à frente no mercado digital.
                        </p>
                    </div>

                    <div className="web-img">
                        <img src={services3} alt=" Imagem serviço web " />
                    </div>

                </div>


                <div className="mobile">
                    <div className="mobile-text">
                        <h2 className="mobile-title">Desenvolvimento Mobile</h2>

                        <p className="mobile-description">
                            No mundo mobile, estamos na vanguarda do desenvolvimento de aplicativos que proporcionam uma experiência fluida e envolvente aos usuários. Trabalhamos com plataformas nativas e híbridas, como React Native e Flutter, para criar aplicativos móveis que funcionam perfeitamente em dispositivos iOS e Android. Desde aplicativos de negócios a soluções de entretenimento e utilitários, desenvolvemos produtos que se destacam pela inovação, desempenho e facilidade de uso, garantindo a melhor experiência mobile para os seus clientes. Além disso, otimizamos os aplicativos para alta performance, mesmo em conexões de internet mais lentas, e implementamos funcionalidades de segurança para proteger dados sensíveis. Nossos aplicativos são pensados para escalar junto com o crescimento de sua empresa, sempre acompanhando as tendências do mercado mobile.
                        </p>
                    </div>

                    <div className="mobile-img">
                        <img src={services1} alt=" Imagem serviço mobile " />
                    </div>
                </div>

                <div className="desktop">
                    <div className="desktop-text">
                        <h2 className="desktop-title">Desenvolvimento Desktop</h2>

                        <p className="desktop-description">
                            Oferecemos soluções de software para desktop projetadas para maximizar a eficiência e o desempenho dos seus processos operacionais. Nossos aplicativos desktop são construídos com foco em alta performance e usabilidade, utilizando tecnologias como C#, Java e Electron. Seja para automação de tarefas, gerenciamento de dados ou criação de ferramentas personalizadas, desenvolvemos soluções robustas que garantem estabilidade e segurança, mesmo em ambientes de uso intenso. Além de desenvolver software sob medida, integramos sistemas existentes para garantir a comunicação perfeita entre as suas soluções. Nossa equipe de especialistas está pronta para oferecer manutenção e melhorias contínuas, acompanhando o crescimento das necessidades do seu negócio.
                        </p>
                    </div>

                    <div className="desktop-img">
                        <img src={services2} alt=" Imagem serviço desktop " />
                    </div>
                </div>

                <div className="feitos">
                    <div className="feitos-text">
                        <p className="feitos-description">
                            No segundo semestre de 2023, o estúdio Magic desenvolveu projetos para as empresas Zencheck e Embrapa.
                        </p>
                    </div>

                    <div className="feitos-img">
                        <img src={embrapa} alt="Embrapa" />

                        <img src={zencheck} alt="Zencheck" />
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}