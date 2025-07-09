import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accessLink } from "./services/link.service";
import logo from './assets/logo.svg';
import { NewLinkForm } from "./components/new-link-form";
import { LinkList } from "./components/link-list";

export function App() {
const [path, setPath] = useState(true);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (shortLink: string) => accessLink(shortLink),
    onMutate: () => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      window.location.href = data.link;
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
    onSettled: () => {},
  });

  useEffect(() => {
    const path = window.location.pathname.slice(1);
    setPath(!!path)
    if (path) {
      mutate(path);
    }
  }, [mutate]);

  return (
    <main className="h-dvh flex flex-col w-full items-center px-3 py-8 overflow-hidden">
      {!path && (
        <>
          <div className="mb-5 flex justify-center w-full md:justify-start md:mb-10 md:mt-14 " style={{ maxWidth: '960px' }}>
            <img src={logo} alt="Logo" className="h-6 " />
          </div>
          <div className="h-full w-full flex gap-3 flex-col justify-center items-center overflow-hidden md:gap-5 md:flex-row md:items-start">
            <NewLinkForm />
            <LinkList />
          </div>
        </>
      )}
      
    </main>
  )
}

