import { FC } from 'react'
import { Button, Col, Row } from 'antd';

type Props = {
    totalCharacters: number
    currentPage: number
    charactersPerPage: number
    onPageChange: (page: number) => void
}

const Pagination: FC<Props> = ({
    totalCharacters,
    currentPage,
    charactersPerPage,
    onPageChange,
}) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <div className="center">
                <Row gutter={8} justify='center'>

                    <Col span={24}>
                        <div className='row'>
                            {currentPage !== 1 && (

                                <Button

                                    className="page-link"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onPageChange(currentPage - 1)
                                    }}
                                >
                                    Previous
                                </Button>

                            )}
                            <div className='spacer' />
                            {currentPage !== Math.ceil(totalCharacters / charactersPerPage) && (

                                <Button
                                    type="primary"
                                    className="pag"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onPageChange(currentPage + 1)
                                    }}
                                >
                                    Next
                                </Button>

                            )}
                        </div>
                    </Col>
                    <Col span={12}> </Col>
                </Row>



            </div>
        </nav>
    )
}

export default Pagination
