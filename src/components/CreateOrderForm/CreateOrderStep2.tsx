import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Form, FormInstance, Input, Popover, Select, Space, Switch, Tooltip, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { CenterServicesListModel } from '../../models/Staff/StaffServices/CenterServicesListModel';
import { addToCart, decreaseCartItem, increaseCartItem, removeItem } from '../../reducers/CartReducer';
import { getCenterServices } from '../../repositories/StaffRepository';
import { RootState } from '../../store/CartStore';
import { CartItem } from '../../types/CartType/CartItem';
import { PriceRange } from '../../types/PriceRange';
import { calculatePrice, getWeightUnitPrice } from '../../utils/CommonUtils';
import { formatCurrency } from '../../utils/FormatUtils';
import PriceTable from '../PriceTable';
import { CenterServiceModel } from '../../models/Staff/StaffServices/CenterServiceModel';

type Props = {
    onNext: () => void;
    onBack: () => void;
    centerId: number;
};

type AddToCartFormData = {
    serviceId: number;
    measurement: number;
};

const CreateOrderStep2 = ({ onBack, onNext, centerId }: Props) => {
    const [services, setServices] = useState<CenterServicesListModel[]>([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [measurementType, setMeasurementType] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const dispatch = useDispatch();

    useEffect(() => {
        getCenterServices().then((res) => {
            setServices(res);
        });
    }, []);

    const handleBack = () => {
        onBack();
    };

    const handleNext = () => {
        onNext();
    };

    const handleChange = (value: number) => {
        console.log(value);
        const selectedCategory = services.find((c) => c.services.find((s) => s.serviceId === value));
        const selectedService = selectedCategory?.services.find((s) => s.serviceId === value);
        if (selectedService && selectedService.priceType) {
            setMeasurementType(true);
        } else {
            setMeasurementType(false);
        }

        // if (selectedService) {
        //     const cartItem: CartItem = {
        //         centerId: 2,
        //         customerNote: '',
        //         id: selectedService.serviceId,
        //         name: selectedService.serviceName,
        //         rate: selectedService.rate,
        //         thumbnail: '',
        //         unit: selectedService.unit,
        //         unitPrice: selectedService.price
        //             ? selectedService.price
        //             : selectedService.prices && getWeightUnitPrice(selectedService.prices, 1),
        //         minPrice: selectedService.minPrice ?? undefined,
        //         price:
        //             selectedService.prices.length > 0
        //                 ? calculatePrice(selectedService.prices, selectedService.minPrice, 1)
        //                 : selectedService.price * 1,
        //         priceChart: selectedService.prices.length > 0 ? selectedService.prices : undefined,
        //         quantity: selectedService.unit.toLowerCase() === 'kg' ? undefined : 1,
        //         weight: selectedService.unit.toLowerCase() === 'kg' ? 1 : undefined,
        //     };
        //     try {
        //         dispatch(addToCart(cartItem) as any).catch((err: Error) => {
        //             message.error(err.message);
        //         });
        //     } catch (error) {
        //         message.error(`Không thể thêm vào giỏ hàng, vui lòng thử lại sau!`);
        //     }
        // }
    };

    const handleRemoveFromCart = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const itemId = (event.target as HTMLDivElement).getAttribute('data-id');
        if (itemId) {
            try {
                dispatch(removeItem(parseInt(itemId)));
                console.log('Đã xóa khỏi giỏ hàng!');
            } catch (error) {
                console.error('Không thể xóa khỏi giỏ hàng:', error);
            }
        }
    };

    const handleSubmitForm = (values: AddToCartFormData) => {
        setOpenAdd(false);
        const selectedCategory = services.find((c) => c.services.find((s) => s.serviceId === values.serviceId));

        const selectedService = selectedCategory?.services.find((s) => s.serviceId === values.serviceId);
        if (selectedService && selectedService.priceType) {
            setMeasurementType(true);
            const cartItem: CartItem = {
                centerId: centerId,
                customerNote: '',
                id: selectedService.serviceId,
                name: selectedService.serviceName,
                rate: selectedService.rate,
                thumbnail: '',
                unit: selectedService.unit,
                unitPrice: selectedService.prices && getWeightUnitPrice(selectedService.prices, 1),
                minPrice:
                    selectedService.minPrice ??
                    selectedService.prices[0].maxValue * selectedService.prices[0].price ??
                    0,
                price:
                    selectedService.prices.length > 0
                        ? calculatePrice(selectedService.prices, selectedService.minPrice, values.measurement ?? 1)
                        : 0,
                priceChart: selectedService.prices.length > 0 ? selectedService.prices : undefined,
                quantity: undefined,
                weight: (values.measurement ?? 1) * 1,
            };
            try {
                dispatch(addToCart(cartItem) as any).catch((err: Error) => {
                    message.error(err.message);
                });
            } catch (error) {
                message.error(`Không thể thêm vào giỏ hàng, vui lòng thử lại sau!`);
            }
        } else if (selectedService && !selectedService.priceType) {
            setMeasurementType(false);
            const cartItem: CartItem = {
                centerId: centerId,
                customerNote: '',
                id: selectedService.serviceId,
                name: selectedService.serviceName,
                rate: selectedService.rate,
                thumbnail: '',
                unit: selectedService.unit,
                unitPrice: selectedService.price ?? 0,
                minPrice: undefined,
                price: selectedService.price ? selectedService.price * (values.measurement ?? 1) : 0,
                priceChart: undefined,
                quantity: Math.round(values.measurement ?? 1) * 1,
                weight: undefined,
            };
            try {
                dispatch(addToCart(cartItem) as any).catch((err: Error) => {
                    message.error(err.message);
                });
            } catch (error) {
                message.error(`Không thể thêm vào giỏ hàng, vui lòng thử lại sau!`);
            }
        } else {
            message.error(`Không thể thêm vào giỏ hàng, vui lòng thử lại sau!`);
            console.log(!measurementType && selectedService);
        }
    };

    const handleSubmitFailed = (error: any) => {
        message.error('Có lỗi xảy ra trong quá trình thêm dịch vụ, vui lòng thử lại!');
    };

    return (
        <>
            <Popover
                arrowContent={false}
                destroyTooltipOnHide
                open={openAdd}
                content={
                    <Form name="add" onFinish={handleSubmitForm} onFinishFailed={handleSubmitFailed} preserve={false}>
                        <Form.Item name="serviceId">
                            <Select
                                onChange={handleChange}
                                placeholder="Chọn dịch vụ"
                                style={{ width: '100%' }}
                                options={
                                    services &&
                                    services.map((service) => {
                                        return {
                                            label: service.serviceCategoryName,
                                            options: service.services.map((item) => {
                                                return {
                                                    label: item.serviceName,
                                                    value: item.serviceId,
                                                };
                                            }),
                                        };
                                    })
                                }
                            />
                        </Form.Item>
                        <Form.Item name="measurement">
                            <Input
                                type="number"
                                placeholder={`Nhập ${measurementType ? 'khối lượng' : 'số lượng'}`}
                                className="placeholder:text-ws-gray"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                }
                title="Thêm dịch vụ"
            >
                <Button
                    type="default"
                    style={{ background: 'white' }}
                    onClick={() => {
                        setOpenAdd(true);
                    }}
                >
                    Thêm dịch vụ
                    <PlusOutlined className="align-middle" style={{ fontSize: 14, paddingBottom: 3 }} />
                </Button>
            </Popover>
            <div className="my-6">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                        return (
                            <div
                                key={`cartitem-${index}`}
                                className="sitecart--item flex flex-wrap items-center p-3 gap-4 border border-wh-gray rounded-2xl"
                                id={item.id.toString()}
                            >
                                <div className="flex flex-grow flex-col h-[80px] justify-between">
                                    <div className="flex justify-between items-center w-full flex-grow">
                                        <div className="sitecart__item--content pt-2">
                                            <h2 className="sitecart__item--title text-xl font-bold">{item.name}</h2>
                                            {item.minPrice && (
                                                <h1 className="text-sm">
                                                    Giá tối thiểu: {formatCurrency(item.minPrice)}
                                                </h1>
                                            )}
                                            <h1 className="text-sm">
                                                Đơn giá: {formatCurrency(item.unitPrice)}/
                                                {item.unit.toLowerCase() !== 'kg' ? 'bộ' : 'kg'}
                                                {item.unit.toLowerCase() === 'kg' && (
                                                    <Tooltip
                                                        className="ml-2 text-sub-gray"
                                                        title={
                                                            item.priceChart && (
                                                                <>
                                                                    <div className="mb-1">
                                                                        {item.minPrice
                                                                            ? `Giá tối thiểu: ${formatCurrency(
                                                                                  item.minPrice ?? 0,
                                                                              )}`
                                                                            : `Giá tối thiểu: ${formatCurrency(
                                                                                  item.unitPrice ?? 0,
                                                                              )}`}
                                                                    </div>
                                                                    <PriceTable
                                                                        isTooltip
                                                                        priceChart={item.priceChart.map(
                                                                            (range): PriceRange => {
                                                                                return {
                                                                                    maxValue: range.maxValue,
                                                                                    price: range.price,
                                                                                };
                                                                            },
                                                                        )}
                                                                        unitType="kg"
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                    >
                                                        <InfoCircleOutlined />
                                                    </Tooltip>
                                                )}
                                            </h1>
                                        </div>
                                        <div className="">
                                            <Space.Compact block>
                                                <button
                                                    className="px-3 pr-2.5 py-3 pt-2.5 text-base text-white flex items-center rounded-l"
                                                    style={{ lineHeight: '0px' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (
                                                            (item.weight && item.weight - 0.1 <= 0) ||
                                                            (item.quantity && item.quantity - 1 <= 0)
                                                        ) {
                                                            dispatch(removeItem(item.id));
                                                        } else {
                                                            dispatch(decreaseCartItem(item.id) as any)
                                                                .then(() => {
                                                                    if (
                                                                        (item.weight && item.weight - 0.2 <= 0) ||
                                                                        (item.quantity && item.quantity - 2 <= 0)
                                                                    ) {
                                                                        message.warning(
                                                                            'Nhấn "-" lần nữa sẽ tự động xóa dịch vụ khỏi giỏ hàng',
                                                                        );
                                                                    }
                                                                })
                                                                .catch((err: Error) => {
                                                                    message.error(err.message);
                                                                });
                                                        }
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    className="border-y border-[#396afc] py-1 w-[50px] text-center"
                                                    type="number"
                                                    name="item-quantity"
                                                    value={
                                                        item.quantity
                                                            ? item.quantity
                                                            : item.weight
                                                            ? parseFloat(item.weight.toString()).toFixed(1)
                                                            : 0
                                                    }
                                                    min={0}
                                                    // onBlur={(e) => {
                                                    //     e.preventDefault();
                                                    //     dispatch(
                                                    //         editCartItem({
                                                    //             id: item.id,
                                                    //             measurement: parseFloat(e.target.value),
                                                    //         }) as any,
                                                    //     ).catch((err: Error) => {
                                                    //         messageApi.error(err.message);
                                                    //     });
                                                    // }}
                                                    // onFocus={(e) => e.target.select()}
                                                />
                                                <button
                                                    className="px-3 pl-2.5 py-3 pt-2.5 text-base text-white flex items-center rounded-r"
                                                    style={{ lineHeight: '0px' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        dispatch(increaseCartItem(item.id) as any).catch(
                                                            (err: Error) => {
                                                                message.error(err.message);
                                                            },
                                                        );
                                                    }}
                                                >
                                                    +
                                                </button>
                                                <div className="py-1 ml-1 text-sm">
                                                    {item.unit === 'kg' ? item.unit : 'bộ'}
                                                </div>
                                            </Space.Compact>
                                        </div>
                                        <div className="sitecart__item--price text-xl font-bold text-primary mt-1">
                                            {formatCurrency(item.price ?? 0)}
                                        </div>
                                        <div
                                            className="sitecart__item--action self-center text-red pr-2 cursor-pointer"
                                            data-id={item.id.toString()}
                                            onClick={(e) => handleRemoveFromCart(e)}
                                        >
                                            <FaTrashAlt className="pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_DEFAULT}
                        description={
                            <>
                                <div className="">Chưa có dịch vụ</div>
                                <div className="">Vui lòng thêm ít nhất một dịch vụ</div>
                            </>
                        }
                    />
                )}
            </div>
            <div className="h-8 mb-10">
                <Button
                    className="float-right ml-6"
                    type="primary"
                    disabled={services.length > 0 ? false : true}
                    onClick={handleNext}
                >
                    Tiếp theo
                </Button>
                <Button className="float-right" type="default" style={{ background: 'white' }} onClick={handleBack}>
                    Quay lại
                </Button>
            </div>
        </>
    );
};

export default CreateOrderStep2;
