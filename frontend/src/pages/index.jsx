import React, { useState } from 'react';
import {
  useGetCustomerGrowthQuery,
  useGetInventoryOverviewQuery,
  useGetSalesOverviewQuery,
} from '../redux/services/analyticsApi';

const Dashboard = () => {
  // State for query parameters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');

  // Fetching data with query parameters
  const { data: inventory, error: inventoryError, isLoading: inventoryLoading } = useGetInventoryOverviewQuery();
  const {
    data: sales,
    error: salesError,
    isLoading: salesLoading,
  } = useGetSalesOverviewQuery({
    page,
    limit,
    searchTerm,
    date,
  });
  const {
    data: customer,
    error: customerError,
    isLoading: customerLoading,
  } = useGetCustomerGrowthQuery({
    page,
    limit,
    searchTerm,
    date,
  });

  if (inventoryLoading || salesLoading || customerLoading) {
    return <div>Loading...</div>;
  }

  if (inventoryError || salesError || customerError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Inventory Overview */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h5 className="fs-20">Inventory Overview</h5>
              <p>Total Stock Value: {inventory?.totalStockValue || 0}</p>
              <h6>Low Stock Items:</h6>
              {inventory?.lowStockItems.length > 0 ? (
                <ul>
                  {inventory.lowStockItems.map((item) => (
                    <li key={item._id}>
                      {item.itemName} - Quantity: {item.quantity}, Price: {item.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No low stock items</p>
              )}
            </div>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h5 className="fs-20">Sales Overview</h5>
              {sales?.data.length > 0 ? (
                <ul>
                  {sales.data.map((sale, index) => (
                    <li key={index}>
                      Month: {sale._id}, Total Sales: {sale.totalSales}, Invoice Count: {sale.invoiceCount}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No sales data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Customer Growth Overview */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h5 className="fs-20">Customer Growth Overview</h5>
              {customer?.data.length > 0 ? (
                <ul>
                  {customer.data.map((growth, index) => (
                    <li key={index}>
                      Month: {growth._id}, New Customers: {growth.newCustomers}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No customer growth data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
