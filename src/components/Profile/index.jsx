// Styles
import './index.less';

// Icons
import { QQIcon, MailIcon } from '../Logo';

// Times
import moment from 'moment';
const birthdate = moment([2020, 1, 25]);
const now = moment(new Date());

export default () => (
    <div className="profile">
        <img className="img-title" src="/src/assets/baoyun.svg" alt="宝云小站" />
        <div className="content">
            <p>嘿，这里是任宝云的个人网站，欢迎光临！</p>
            <p>
                我现在 <strong>{now.diff(birthdate, 'year')}</strong> 岁了！
            </p>
            <h4>联系我</h4>
            <ul className="contact">
                <li className="contact-info">
                    <QQIcon /> <span>2069818063</span>
                </li>
                <li className="contact-info">
                    <MailIcon /> <span>2069818063@qq.com</span>
                </li>
            </ul>
        </div>
    </div>
);
