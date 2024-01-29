import { Container, Row, Col, Card, Button, Collapse } from 'react-bootstrap';
import { faMasksTheater, faBurger, faGraduationCap, faChampagneGlasses, faMicrochip, faFutbol, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ListaGeralEventos from '../../components/ListaGeralEventos/index.tsx';


export default function PaginaInicial() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };


    return (
        <div className="App">
            <h5 className="ms-5 mt-5">
                Exibir Categorias de Eventos{" "}
                <Button
                    variant="link"
                    className="rounded-circle"
                    onClick={toggleMenu}
                    aria-controls="categorias-menu"
                    aria-expanded={isMenuOpen}
                >
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
            </h5>
            <Container>
                <Collapse in={isMenuOpen}>
                    <div id="categorias-menu">
                        <Row className="justify-content-md-center ms-5 me-5 mt-3">
                            {categorias.map((categoria, index) => (
                                <Col xs={6} sm={4} md={3} lg={2} key={index}>
                                    <Card className="text-center" style={{ width: "175px", boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', border: '0' }}>
                                        <Card.Body>
                                            <i className={`bi bi-gear-fill text-primary`} style={{ fontSize: '2rem' }}>
                                                <FontAwesomeIcon icon={categoria.icon} />
                                            </i>
                                            <Card.Title className="mt-2">{categoria.nome}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Collapse>
            </Container>
            <div className='mt-5 ms-5 me-5'>
                <ListaGeralEventos></ListaGeralEventos>
            </div>
        </div>
    );
}
const categorias = [
    { nome: "Teatros", icon: faMasksTheater },
    { nome: "Festas", icon: faChampagneGlasses },
    { nome: "Gastronomia", icon: faBurger },
    { nome: "Workshops", icon: faGraduationCap },
    { nome: "Tecnologia", icon: faMicrochip },
    { nome: "Esportes", icon: faFutbol },
];