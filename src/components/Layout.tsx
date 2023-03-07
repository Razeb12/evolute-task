import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();

    const isLinkActive = (href: string): boolean => {
        return router.pathname === href;
    };

    return (
        <div>
            <nav className='row'>
                <ul className='list'>
                    <li >
                        <Link href="/" className={isLinkActive('/') ? 'active' : ''}>
                            Home
                        </Link>
                    </li>
                    <li >
                        <Link href="/statistics" className={isLinkActive('/statistics') ? 'active' : ''}>
                            Statistics
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
