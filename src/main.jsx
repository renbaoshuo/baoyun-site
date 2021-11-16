import { render } from 'preact';

// Components
import Profile from './components/Profile';
import Footer from './components/Footer';

// Styles
import 'modern-normalize';
import './index.less';

// Main App
const App = () => (
    <main className="main">
        <div className="card">
            <Profile />
            <Footer />
        </div>
    </main>
);

render(<App />, document.getElementById('app'));
