import { type FormEventHandler, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { clsx } from 'clsx';

import { Input } from 'uikit/components';
import type { StyleOverrides } from 'uikit/types';

import { searchForm, searchIcon, searchInput } from './styles.module.css';

export interface Props extends StyleOverrides {}

export const Search = ({ className }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search: string | null = formData.get('search') as string;

    setSearchParams(search ? { search: search.trim().toLowerCase() } : {});

    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <form className={clsx(searchForm, className)} onSubmit={handleFormSubmit}>
      <Input
        name="search"
        type="search"
        placeholder="Type to Search a Video..."
        value={search}
        className={searchInput}
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <span className={searchIcon} />
    </form>
  );
};
