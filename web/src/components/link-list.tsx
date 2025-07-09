import React from 'react';
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import LinkItem from './link-item';
import { exportCSV } from '../services/csv.service';
import { getAllLinks } from '../services/link.service';
import { LoadingSpinner } from './ui/loading-spinner';

export function LinkList() {
    const { data, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: getAllLinks,
    });

    const isLinksEmpty = !data || data.total === 0;

    return (
        <div className="w-full grow p-8 rounded-2xl bg-gray-100 flex flex-col gap-4 overflow-hidden" style={{ maxHeight:'100%', minWidth:'360px', maxWidth:'580px' }}>
            <div className='flex justify-between items-center'>
                <h2 className="text-lg font-bold text-gray-600">Meus links</h2>
                <button 
                style={{height: '32px'}}
                onClick={() => exportCSV()}
                className={`flex text-gray-500 text-xs justify-center items-center rounded-sm bg-gray-200 px-2 font-semibold gap-1.5 ${isLinksEmpty ? 'opacity-50 cursor-none' : 'cursor-pointer hover:border hover:border-blue-base'}`}
                disabled={isLoading || isLinksEmpty}><DownloadSimpleIcon size={16} className='text-gray-600' />Baixar CSV</button>
            </div>
                 <div className='flex flex-col gap-4 overflow-x-hidden overflow-y-auto link-list'>
                        {isLoading && (
                            <div className='flex flex-col gap-4 justify-center items-center'>
                                <LoadingSpinner />
                                <p className='text-xs'>carregando links</p>
                            </div>
                        )}
                        {!isLoading && isLinksEmpty && (
                            <>
                                <div className="bg-gray-200 h-[1px] w-full"></div>
                                <div className='flex flex-col items-center justify-center gap-3 pt-4 pb-6'>
                                    <LinkIcon size={32} className='text-gray-400' />
                                    <p className='uppercase text-xs text-gray-500'>ainda não existem links cadastrados</p>
                                </div>
                            </>
                        )}
                        {!isLoading && !isLinksEmpty &&
                            data.links.map((link) => {
                                            return (
                                                <React.Fragment key={link.id}>
                                                    <div className="bg-gray-200 h-[1px] w-full"></div>
                                                    <LinkItem link={link} />
                                                </React.Fragment>
                                            )
                        })}
                </div>
        </div>
    ); 
}