import { Link } from '../routes-page';

const Index = (props) => (
  <div >
    <Link route="/customer/666/detail">
      <a>Customer Detail</a>
    </Link>
    <div></div>
    <Link route="/about">
      <a>About Page</a>
    </Link>
    <div></div>
    <Link route="/customer">
      <a>Customer</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

export default Index