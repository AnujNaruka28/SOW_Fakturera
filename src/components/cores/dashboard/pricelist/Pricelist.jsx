import { useEffect, useState } from 'react';
import '../../../../styles/dashboard/pricelist.css';
import apiService from '../../../../services/apiService';
import { toast } from 'react-toastify';
import SearchInput from '../extras/SearchInput';
import { BsPlusCircleFill, BsPrinterFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Input, Result, Spin, Switch } from 'antd';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { useForm } from 'react-hook-form';

const Pricelist = () => {

    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const { register, setValue, watch } = useForm({
        defaultValues: {
            products: []
        }
    });
    useEffect(() => {
        (
            async () => {
                try {
                    setLoader(true);
                    const productRes = await apiService.getProducts();
                    if (productRes) {
                        setProducts(productRes.data);
                    }
                    toast.success('Products Fetched Successfully.');


                } catch (error) {
                    setError(true);
                    console.log(error);
                    toast.error('Failed to fetch products.');
                } finally {
                    setLoader(false);
                }
            }
        )();
    }, [])
    useEffect(() => {
        if (products.length > 0) {
            setValue("products", products)
        }
    }, [products])
    const handleUpdate = async (id, field, value) => {
        try {
            const numerics = ['inPrice', 'price', 'inStock'];
            const payload = {
                [field]: numerics.includes(field) ? Number(value) || 0 : value
            }
            const res = await apiService.updateProduct(id, payload);
            if (res.ok) {
                setProducts(prev => prev.map(product => product.id === id ? { ...product, ...res.data } : product))
            }
            toast.success('Product updated successfully');
        } catch (err) {
            toast.error('Error while updating data');
        }
    }
    const headers = products.length > 0 ? Object.keys(products[0]) : [];
    const filteredHeaders = headers.filter((_, i) =>
        i !== 0 && i !== headers.length - 1 && i !== headers.length - 2
    );
    return (
        <section className="pricelist-main">
            <header className='pricelist-header'>
                <div className='left-search-box'>
                    <SearchInput placeholder={"Search Article No..."} />
                    <SearchInput placeholder={"Search Product..."} />
                </div>

                <div className='right-btns-box'>
                    {
                        [
                            { btnName: "New Product", icon: BsPlusCircleFill, classIcon: 'plus-add-product' },
                            { btnName: "Print List", icon: BsPrinterFill, classIcon: 'print-product-list' },
                            { btnName: "Advanced Mode", icon: Switch, classIcon: 'advance-switch' }
                        ].map((btn, i) => (
                            <div className='pricelist-right-btn' key={i}>
                                <p>{btn.btnName}</p>
                                <btn.icon className={`${btn.classIcon}`} />
                            </div>
                        ))
                    }
                </div>
            </header>
            <main className='pricelist-container'>
                {
                    (loader) ? (
                        <Spin size='large' />
                    ) : (
                        (error) ? (
                            <Result
                                status="warning"
                                title="There are some problems with fetching products."
                            />
                        ) : (
                            <div className='pricelist-table'>
                                <Table className='table-main'>
                                    <Thead>
                                        <Tr>
                                            {
                                                filteredHeaders.map((header, i) => (
                                                    <Th key={i} className={`table-header  ${(header === 'inPrice' || header === 'description') && 'tb-cell-hidden'
                                                        || (header === 'articleNumber' || header === 'unit' || header === 'inStock') && 'tb-cell-hidden-mobile'
                                                        }`}>{header.charAt(0).toUpperCase() + header.slice(1)}</Th>
                                                ))
                                            }
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            products.map((product, i) => (
                                                <Tr key={i} className='table-row'>
                                                    {/* {
                                                    <IoIosArrowRoundForward className='right-rows-arrow'/>
                                                } */}
                                                    {
                                                        filteredHeaders.map((header, j) => {
                                                            const value = product[header];
                                                            return (
                                                                <Td key={j} className={`table-cell ${(header === 'inPrice' || header === 'description') && 'tb-cell-hidden'
                                                                    || (header === 'unit' || header === 'inStock' || header === 'articleNumber') && 'tb-cell-hidden-mobile'
                                                                    }`}>
                                                                    <Input value={value} name={header}
                                                                        type={['inPrice', 'price', 'inStock'].includes(header) ? 'number' : 'text'}
                                                                        className='input-table-cell'
                                                                        onChange={(e) => {
                                                                            setValue(`products.${i}.${header}`, e.target.value);
                                                                            setProducts(prev =>
                                                                                prev.map((p, idx) =>
                                                                                    idx === i ? { ...p, [header]: e.target.value } : p
                                                                                )
                                                                            );
                                                                        }}
                                                                        onBlur={async (e) => await handleUpdate(product.id, header, e.target.value)}
                                                                        onKeyDown={(e) => e.key === "Enter" && e.target.blur()} />
                                                                </Td>
                                                            )
                                                        })
                                                    }
                                                    <Td className='table-cell'>
                                                        <HiDotsHorizontal className='table-triple-dot' />
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </div>
                        )
                    )
                }
            </main>
        </section>
    )
}

export default Pricelist;
