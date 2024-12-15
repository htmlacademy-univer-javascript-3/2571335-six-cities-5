import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import SortFilter from './sort-filter.tsx';
import { FILTERS } from '../../mocks/filter.ts';

describe('SortFilter Component', () => {
  it('renders with the initial filter', () => {
    const mockHandleFilterEnter = vi.fn();
    render(<SortFilter filter = "Popular" handleFilterEnter = {mockHandleFilterEnter} />);

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('calls handleFilterEnter when a filter is clicked', () => {
    const mockHandleFilterEnter = vi.fn();
    render(<SortFilter filter = 'Popular' handleFilterEnter = {mockHandleFilterEnter} />);

    fireEvent.mouseEnter(screen.getByText('Popular'));

    const filterOption = screen.getByText(FILTERS[1]);
    expect(filterOption).toBeInTheDocument();

    fireEvent.mouseDown(filterOption);

    expect(mockHandleFilterEnter).toHaveBeenCalledWith(FILTERS[1]);
  });

});
