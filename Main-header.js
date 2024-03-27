import Image from "next/image";
import Link from "next/link";
import imglogo from '@/assets/logo.png'
import classes from './Main-header.module.css';
import NavLink from "./nav-link";
import mainheaderbackground from "./Main-header-background";


export default function Header(){
    return<>
    <mainheaderbackground/>
     <header className={classes.header}>
    <Link className={classes.logo} href="/">
        <Image src={imglogo} alt="delicious food serve here" priority/>
        Nextlevel food website
    </Link>
    <nav className={classes.nav}>
        <ul>
            <li>
                <NavLink href="/meals"> Browse meals</NavLink>
            </li>
            <li>
                <NavLink href="/community"> Show comunity</NavLink>
            </li>
        </ul>
    </nav>
    </header>
    </>
}