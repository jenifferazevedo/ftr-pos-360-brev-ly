import notFound from '../assets/not_found.svg';

export function NotFound() {
    return (
        <div 
            className="max-w-[580px] p-8 rounded-lg bg-gray-100 flex flex-col gap-6 justify-center items-center text-center" 
        >
            <img src={notFound} alt="Logo" className="h-[164px] " />
            <p className='text-xl font-bold text-gray-600'>Link não encontrado</p>
            <p className='text-md text-gray-500'>O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. 
                Saiba mais em <a href={import.meta.env.VITE_FRONTEND_URL} className='text-blue-base'>brev.ly</a>.</p>
        </div>
    );
}
