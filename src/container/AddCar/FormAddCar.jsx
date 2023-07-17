import {Form, Button, Col, Container, Row} from 'react-bootstrap';
import iconUpload from "../../assets/image/fi_upload.svg";
import './FormAddCar.css'

import { add, updateField } from '../../redux/FormCar/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import swal from "sweetalert";

const FormAddCar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { carItem } = useSelector((state) => state.formCar)
    const [tempUrl, setTempUrl] = useState();
    const [formValues, setFormValues] = useState({
        name: null,
        price: 0,
        image: "",
        category: null,
        
    });

    const onChangeFiles = (e) => {
        const selectedFiles = e.target.files;
        const file = selectedFiles[0];
        const tempUrlValue = URL.createObjectURL(file);
        setTempUrl(tempUrlValue)

        console.log("temp url >>>", tempUrlValue)

        setFormValues({
            name: formValues.name,
            price: formValues.price,
            image: file,
            category: formValues.category,
        })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', formValues.name);
        formData.append('price', formValues.price);
        formData.append('image', formValues.image);
        formData.append('category', formValues.category);

        try{
            const response = await axios.post('https://api-car-rental.binaracademy.org/admin/car', 
            formData,
            {
                headers: {
                    access_token: 
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc"
                }
            }
            )
            // console.log("response>", response)
            dispatch(add(response.data))
            navigate('/dashboard');
        }catch(error) {
            dispatch(updateField());
            swal("Gagal menambahkan", "" , "error")
        }
        
    };

    useEffect(() => {
        if (carItem && carItem.name && carItem.price && carItem.image && carItem.category) {
            setFormValues({
             name: carItem.name,
             price: carItem.price,
             image: carItem.image,
             category: carItem.category,
             index: carItem.index,
            });
        };

    }, [carItem]);
    
    return (
        <Container fluid className='p-0 m-0 containerAddCar'>
            <Row className="m-0">
                <h4 style={{marginLeft: "330px", height: "100%"}}>Add Car</h4>
                <Col xs="auto" className='colAddcar d-none d-md-block h-100' />
            </Row>
            <Form onSubmit={handleSubmit}>
                <div className='car-container'>
                    <div className='row row-car'>
                        <div className="w-100 bg-white p-3">

                            <fieldset className='font-template w-100'>
                                <Form.Group
                                    className="mb-3"
                                    controlId="name"
                                    data-testid="wrapper-labelName">
                                    <Row>
                                        <Form.Label
                                            data-testid="label-Name"
                                            column
                                            sm="4"
                                            className="mb-0 d-flex align-items-center">
                                            Nama/Tipe Mobil
                                            <span className="text-danger" data-testid="label-SpanName">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Input Nama/Tipe Mobil"
                                                className='forminput'
                                                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="price"
                                    data-testid="wrapper-labelPrice">
                                    <Row>
                                        <Form.Label
                                            data-testid="label-Price"
                                            column
                                            sm="4"
                                            className="mb-0 d-flex align-items-center">
                                            Harga
                                            <span className="text-danger" data-testid="label-SpanPrice">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="number"
                                                placeholder="Input Harga Sewa Mobil"
                                                className='forminput'
                                                onChange={(e) => setFormValues({...formValues, price: e.target.value})}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="image"
                                    data-testid="wrapper-Photo">
                                    <Row>
                                        <Form.Label
                                            data-testid="label-Photo"
                                            column
                                            sm="4"
                                            className="mb-0 d-flex align-items-center">
                                            Foto
                                            <span className="text-danger" data-testid="label-SpanPhoto">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Col sm="8" className="position-relative">
                                            <img
                                                src={iconUpload}
                                                alt=""
                                                className="position-absolute"
                                                style={{
                                                right: "21px",
                                                top: "9px"
                                            }}/>
                                            <Form.Control
                                                type="file"
                                                accept="image/png, image/gif, image/jpeg"
                                                className='forminput'
                                                onChange={onChangeFiles}
                                                // value={tempUrl}
                                            />
                                            <div>
                                                <img src={tempUrl}></img>
                                            </div>
                                            <p
                                                className="mb-0"
                                                style={{
                                                lineWeight: 300,
                                                fontSize: "10px",
                                                lineHeight: "14px",
                                                color: "#8A8A8A"
                                            }}>
                                                File size max. 2MB
                                            </p>
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="category"
                                    data-testid="wrapper-Category">
                                    <Form.Label
                                        data-testid="label-Category"
                                        column
                                        sm="4"
                                        className="mb-0 d-flex align-items-center">
                                        Kategori
                                        <span className="text-danger" data-testid="label-SpanCategory">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Select
                                        className='forminput'
                                        onChange={(e) => setFormValues({...formValues, category: e.target.value})}
                                        value={formValues.category ?? ""}
                                        >
                                            <option hidden>Pilih Kategori Mobil</option>
                                            <option value="small">2 - 4 orang</option>
                                            <option value="medium">4 - 6 orang</option>
                                            <option value="large">6 - 8 orang</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <div className="formInfo">
                                    <Row className="mb-3">
                                        <Col sm="4" className="mb-0">
                                            Created at
                                        </Col>
                                        <Col sm="8">-</Col>
                                    </Row>
                                    <Row>
                                        <Col sm="4" className="mb-0">
                                            Updated at
                                        </Col>
                                        <Col sm="8">-</Col>
                                    </Row>
                                </div>
                            </fieldset>
                        </div>
                        <div
                            className="d-flex"
                            style={{
                            marginTop: "40px"
                        }}>
                            <Button
                                className='d-flex align-items-center me-3 btnCancel'
                                onClick={() => navigate('/carlist')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className='d-flex align-items-center text-white btnSave'>
                                Save
                            </Button>
                        </div>

                    </div>
                </div>
            </Form>
        </Container>
    )
}

export default FormAddCar;