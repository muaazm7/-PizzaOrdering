import { Link, Routes, Route } from 'react-router-dom';
import OrdersPlaced from './OrdersPlaced';
import Order from './order';
import Graphs from './Graphs';
import AddPizza from './AddPizza';
import AddTopping from './AddTopping';
import AddUser from './user';


function ViewOrders() {
  return <h2>View Orders </h2>;
}

function Analytics() {
  return <h2>Analytics</h2>;
}

function PlaceOrder() {
  return <h2>Place Orders</h2>;
}

function NewPizza() {
  return <h2>Add Pizza</h2>;
}

function NewToppings() {
  return <h2>Add Toppings</h2>;
}

function CreateUser() {
  return <h2>Add User</h2>;
}

export default function Dashboard() {
  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.sidebar}>
        <h2>Dashboard</h2>
        <ul style={styles.navList}>
          <li><Link to="/orders" style={styles.navLink}>View Orders </Link></li>
          <li><Link to="/analytics" style={styles.navLink}>Analytics</Link></li>
          <li><Link to="/place-order" style={styles.navLink}>Place Orders</Link></li>
          <li><Link to="/add-pizza" style={styles.navLink}>AddPizza</Link></li>
          <li><Link to="/add-topping" style={styles.navLink}>AddToppings</Link></li>
          <li><Link to="/add-user" style={styles.navLink}>AddUser</Link></li>
        </ul>
      </div>

      <div style={styles.content}>
        <Routes>
          <Route path="/orders" element={<OrdersPlaced />} />
          <Route path="/analytics" element={<Graphs />} />
          <Route path="/place-order" element={<Order />} />
          <Route path="/add-pizza" element={<AddPizza />} />
          <Route path="/add-topping" element={<AddTopping />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/" element={<ViewOrders />} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#004080',
    color: '#fff',
    padding: '20px',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '10px 0',
    display: 'block',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
};
