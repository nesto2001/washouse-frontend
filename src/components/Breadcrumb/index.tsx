import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BreadcrumbItem } from '../../types/BreadcrumbItem';
import { decodeURI, decodeURILink } from '../../utils/FormatUtils';
import style from './Breadcrumb.module.scss';

const Breadcrumb = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
    const { id } = useParams();
    useEffect(() => {
        const pathname = location.pathname;
        const pathArr = pathname.split('/').filter((path) => path !== '');
        const items: BreadcrumbItem[] = pathArr.map((path, index, array) => ({
            label: path,
            path: `/${array.slice(0, index + 1).join('/')}`,
            isLast: index === pathArr.length - 1,
        }));
        setBreadcrumbs(items);
        return () => {};
    }, [location]);

    return (
        <nav aria-label="breadcrumb" className="pt-4">
            <ol className="breadcrumb flex items-center">
                <li className={clsx(style.breadcrumb__item, style.trail)}>
                    <Link to="/">Trang chủ</Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                    <li className="flex items-center" key={index}>
                        <FaAngleRight className="m-0 inline-block" />
                        <div
                            className={clsx(
                                style.breadcrumb__item,
                                crumb.isLast ? style.last : style.trail,
                                'capitalize',
                            )}
                            key={crumb.path}
                            aria-current={crumb.isLast ? 'page' : undefined}
                        >
                            {crumb.isLast ? (
                                decodeURI(crumb.label.substring(0, crumb.label.lastIndexOf('-')))
                            ) : (
                                <Link to={`${decodeURILink(crumb.path)}${id ? '-c.' : ''}${id ?? ''}`}>
                                    {decodeURI(crumb.label)}
                                </Link>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
