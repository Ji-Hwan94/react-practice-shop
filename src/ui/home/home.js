import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from './card'

export default function Home({shoes}){
    return (
        <>
            <div className='main-bg'></div>
            <Container>
                <Row>
                {
                    shoes.map((obj, i) => {
                    return (
                            <Card obj={obj} i={i} key={i}/>
                        );
                    })
                }
                </Row>
            </Container>    
        </>
    )
}