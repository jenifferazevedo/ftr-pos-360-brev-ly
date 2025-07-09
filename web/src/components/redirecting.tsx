import logo_icon from '../assets/logo_icon.svg';

export function Redirecting() {
    return (
        <div 
            className="max-w-[580px] p-8 rounded-lg bg-gray-100 flex flex-col gap-6 justify-center items-center text-center" 
        >
            <img src={logo_icon} alt="Redirecting Logo" className='h-12' />
            <p className='text-xl font-bold text-gray-600'>Redirecionando...</p>
            <div className='text-md text-gray-500 text-center'>
                <p>O link será aberto automaticamente em alguns instantes. </p> 
                <p>Não foi redirecionado? <a href={window.location.href} target='_blank' className='text-blue-base cursor'>Access aqui</a></p>
            </div>
        </div>
    );
}
