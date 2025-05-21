import React, { useEffect, useState } from 'react';
import Navi from './Navi';
import Footer from './Footer';
import userPool from '../services/cognito/Userpool';
import { fetchSellerOrders, updateOrders } from '../services/apicalls';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function ReceivedOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [modalStatus, setModalStatus] = useState('');
    const [modalDeliveryDate, setModalDeliveryDate] = useState('');
    const [idtoken,setIdtoken]=useState("")
    const user = userPool.getCurrentUser();

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const result = await fetchSellerOrders(user.username);
            if (result.success) {
                setOrders(result.data);
                console.log(result.data)
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };



    const formatCurrency = (amount) => `₹${Number(amount).toFixed(2)}`;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const extractName = (url) => {
        return url.substring(url.lastIndexOf("/") + 1)

    }


    const handleOnclick = (order) => {
        setSelectedOrder(order);
        setModalStatus(order.order_status);
        setModalDeliveryDate(order.estimatedDelivery || '');
        setShowStatusModal(true);
    };

    const handleUpdateStatus = async () => {
        console.log(`Updating order ${selectedOrder.orderId}:`, {
            newStatus: modalStatus,
            deliveryDate: modalDeliveryDate
        });
        const payload = {
            orderId: selectedOrder.orderId,
            newStatus: modalStatus,
            deliveryDate: modalDeliveryDate,
            userId: selectedOrder.userId
        };

        const Header = {
            "Authorization": idtoken
        };

        const response = await updateOrders(payload,Header)
        if (response.success) {
            toast.success("updated")
            fetchOrders()
        }
        else {
            toast.error("failed")
        }

        setShowStatusModal(false);
    };

    const getStatusBadgeColor = (status) => {
        switch (status.toLowerCase()) {
            case 'processing': return 'warning';
            case 'shipped': return 'info';
            case 'delivered': return 'success';
            case 'cancelled': return 'danger';
            default: return 'secondary';
        }
    };
    const fetchTokens = async () => {
        user.getSession((err, session) => {
            if (err) {
                console.error("Error fetching session:", err);
            } else {


                setIdtoken(session.getIdToken().getJwtToken())


            }
        });
    }
    useEffect(() => {
        fetchOrders();
        fetchTokens()
    }, []);

    return (
        <>
            <Navi />
            <div style={{ minHeight: "100vh", backgroundColor: "#E4F5EC", paddingTop: "80px", paddingBottom: "50px" }}>
                <div className="container">
                    <h2 className="mb-4 text-success fw-bold">Received Orders</h2>
                    {loading ? (
                        <div className="d-flex justify-content-center my-5">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="card shadow-sm">
                            <div className="card-body text-center py-5">
                                <i className="bi bi-inbox fs-1 text-muted"></i>
                                <p className="mt-3 text-muted">No orders received yet</p>
                            </div>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div className="card shadow-sm mb-4" key={order.orderId}>
                                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className={`badge bg-${getStatusBadgeColor(order.order_status)} me-2`}>
                                            {order.order_status.toUpperCase()}
                                        </span>
                                        <small className="text-muted">Order ID: {order.orderId}</small>
                                    </div>
                                    <div className="text-end">
                                        <h5 className="mb-0">{formatCurrency(order.totalAmount)}</h5>
                                        <small className="text-muted">
                                            {order.placed_at ? formatDate(order.placed_at) : 'Date not available'}
                                        </small>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <h6 className="text-success">Customer Details</h6>
                                            <div className="card bg-light">
                                                <div className="card-body py-2">
                                                    <p className="mb-1"><strong>User ID:</strong> {order.userId?.substring(0, 8)}...</p>
                                                    <p className="mb-0"><strong>Address:</strong> {order.Address}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h6 className="text-success">Payment & Delivery</h6>
                                            <div className="card bg-light">
                                                <div className="card-body py-2">
                                                    <p className="mb-1"><strong>Payment Method:</strong> {order.paymentMethod || 'Not specified'}</p>
                                                    <p className="mb-0"><strong>Estimated Delivery:</strong> {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : 'Not available'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="text-success mt-2">Order Items</h6>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead className="table-light">
                                                <tr>
                                                    <th style={{ width: "60px" }}></th>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items && order.items.map((item, itemIndex) => {
                                                    const imageName = extractName(item.image_url)
                                                    return (
                                                        <tr key={itemIndex}>
                                                            <td>
                                                                <img
                                                                    src={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}` || '/api/placeholder/40/40'}
                                                                    alt={item.name}
                                                                    className="img-thumbnail"
                                                                    style={{ width: "40px", height: "40px" }}
                                                                />
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>{formatCurrency(item.price)}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{formatCurrency(item.price * item.quantity)}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                            <tfoot className="table-light">
                                                <tr>
                                                    <td colSpan="4" className="text-end"><strong>Total:</strong></td>
                                                    <td><strong>{formatCurrency(order.totalAmount)}</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div className="card-footer bg-white">
                                    <div className="d-flex justify-content-end gap-2">
                                        <button onClick={() => handleOnclick(order)} className="btn btn-outline-success btn-sm">
                                            Update Status
                                        </button>
                                        <button className="btn btn-success btn-sm">
                                            Contact Customer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>


            {showStatusModal && selectedOrder && (
                <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Order Status</h5>
                                <button type="button" className="btn-close" onClick={() => setShowStatusModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Select Status</label>
                                    <select
                                        className="form-select"
                                        value={modalStatus}
                                        onChange={(e) => setModalStatus(e.target.value)}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Expected Delivery Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={modalDeliveryDate}
                                        onChange={(e) => setModalDeliveryDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowStatusModal(false)}>Close</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdateStatus}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default ReceivedOrders;