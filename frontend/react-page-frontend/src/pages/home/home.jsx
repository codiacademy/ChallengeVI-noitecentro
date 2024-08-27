import { Header } from "../header/header.jsx";
import { Footer } from "../footer/footer.jsx";
import { Link } from "react-router-dom";
import homeImage from '../../assets/images/home.png';
import "./home.css"

export function Home() {

    return (
        <div className="home-body">
            <Header />

            <div className="home-container">
                <div className="home-content">
                    <div className="text-container">
                        <h1 className="title-home">INOVAÇÃO DIGITAL E PERSONALIZADA PARA O SEU <span className="hightlight">SUCESSO</span></h1>
                        <p>
                            Não é apenas sobre desenvolvimento de software, é sobre envolvimento! Buscamos entender suas necessidades nos mínimos detalhes para oferecer soluções que realmente façam sentido, desde o primeiro contato até a entrega final.
                        </p>

                        <div className="button-home">
                            <Link className="reuniao-link-button" to="/reuniao" > Marque uma Reunião conosco </Link>
                        </div>
                    </div>

                    <div className="image-home">
                        <img src={homeImage} alt="Os profissionais da empresa reunidos em uma mesa" />
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}