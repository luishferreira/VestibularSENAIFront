import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const year = () => {
    let date = new Date();
    let year = date ? date.getFullYear() : '2020';
    return year ? year : '2020';
}

const Footer = () => (
    <footer className="page-footer font-small">
        <Container>
            <Row>
                <Col md="12">
                    <div className="footer-copyright text-center py-3">
                        Faculdade Senai {year()}
                    </div>
                </Col>
            </Row>
        </Container>
    </footer>
)

export default Footer