import { Link, useLocation } from 'react-router-dom';
import '../../../styles/dashboard/sidebar.css';
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbInvoice } from "react-icons/tb";
import { FaUser,FaAddressCard } from "react-icons/fa6";
import { SlSettings } from "react-icons/sl";
import { ImBook,ImFilesEmpty } from "react-icons/im";
import { BsFillTagFill } from "react-icons/bs";
import { IoMdCloseCircle,IoIosClipboard,IoIosCloudUpload,IoIosLogOut } from "react-icons/io";
import { BiSolidDiscount } from "react-icons/bi";
// import { useState } from 'react';

const Sidebar = () => {
    const  { pathname } = useLocation();
    const navOptions = [
        {
            icon: TbInvoice,
            name: 'Invoices',
            path: '/dashboard/invoices',
            className: 'invoice-icon'
        },
        {
            icon: FaUser,
            name: 'Customers',
            path: '/dashboard/customers',
            className: 'customer-icon'
        },
        {
            icon: SlSettings,
            name: 'My Business',
            path: '/dashboard/my-business',
            className: 'business-icon'
        },
        {
            icon:  ImBook,
            name: 'Invoice Journal',
            path: '/dashboard/invoice-journal',
            className: 'journal-icon'
        },
        {
            icon: BsFillTagFill,
            name: 'Price List',
            path: '/dashboard/pricelist',
            className: 'pricelist-icon'
        },
        {
            icon: ImFilesEmpty,
            name: 'Multiple Invoicing',
            path: '/dashboard/multiple-invoicing',
            className: 'multi-icon'
        },
        {
            icon: IoMdCloseCircle,
            name: 'Unpaid Invoices',
            path: '/dashboard/unpaid-invoices',
            className: 'unpaid-icon'
        },
        {
            icon: BiSolidDiscount,
            name: 'Offer',
            path: '/dashboard/offer',
            className: 'offer-icon'
        },
        {
            icon: IoIosClipboard,
            name: 'Inventory Control',
            path: '/dashboard/inventory-control',
            className: 'inventory-icon'
        },
        {
            icon: FaAddressCard,
            name: 'Member Invoicing',
            path: '/dashboard/member-invoicing',
            className: 'member-icon'
        },
        {
            icon: IoIosCloudUpload,
            name: 'Import/Export',
            path: '/dashboard/import-export',
            className: 'im-export-icon'
        },
        {
            icon: IoIosLogOut,
            name: 'Log out',
            path: '/dashboard/log-out',
            className: 'logout-icon'
        }
    ];
    
    return (
        <div className="sidebar-main">
            <header className='sidebar-header'>
                {/* <div className='go-back'>
                    <Link to={'/'} className='go-back-link'>
                       <IoIosArrowRoundBack className='back-arrow'/>
                       Back        
                    </Link>
                    <MdOutlineKeyboardDoubleArrowLeft className='close-arrow' onClick={() => toggleSidebar()}/>
                </div> */}
                <div className='menu-header'>
                    Menu
                </div>
            </header>
            <div className='sidebar-divider'/>
            <div className='nav-container'>
                {
                    navOptions.map((opt,i) => (
                        <Link to={opt.path} key={i} className={`sidebar-navoptions ${pathname === opt.path ? 'padding-active' : 'padding-unactive'}`}>
                            
                                <div className={`select-indicator ${pathname === opt.path ? 'active' : 'hidden'}`}>
                                    <div className='select-indicator-inner'/>
                                </div>
                            
                            <opt.icon className={`${opt.className}`}/>
                            <div className={`${['Inventory Control','Member Invoicing'].includes(opt.name) ? 'disabled-sidebar-opt' : ''}`}>
                                {opt.name}
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar;