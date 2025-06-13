import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import '../../css/BioMarker/BioMarker.css'
import cdacLogo from '../../assets/CDAC.png'

// Sample data
const data = Array.from({ length: 23 }).map((_, i) => ({
    accessionNumber: `ACC-${i + 1}`,
    lineage: `Lineage ${i + 1}`,
    sequence: `SEQ${i + 1}`,
}));

// Column helper (without type)
const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("accessionNumber", {
        header: "Accession Number",
    }),
    columnHelper.accessor("lineage", {
        header: "Lineage",
    }),
    columnHelper.accessor("sequence", {
        header: "Sequence",
    }),
];

export default function BioMarkerHome() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data,
        columns,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className='bg-light pb-2'>
            <div className='py-2 bg-danger d-flex justify-content-between'>
                <div>
                    <img src={cdacLogo} className='img-fluid ms-3' width={'60px'}></img>
                </div>
                <div className='text-white display-6 text-center fw-bold'>Bio-Marker</div>
                <div>
                    
                </div>
            </div>

            <div className='p-3 m-5 mb-5'>
                <div className='row'>
                    <div className='col-12 card p-3 mb-3'>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Upload your file</label>
                            <input className="form-control" type="file" id="formFile" />
                        </div>
                    </div>

                    <div className='col-12 card p-3'>
                        <h5 className='mb-3'>Data</h5>
                        <div className="table-responsive">
                            <table className="table shadow-sm mb-2 table-bordered table-hover table-striped align-middle text-center mb-0">
                                <thead className="table-danger">
                                    <tr className=''>
                                        <th style={{ width: "25%" }}>Accession Number</th>
                                        <th style={{ width: "25%" }}>Lineage</th>
                                        <th style={{ width: "50%" }}>Sequence</th>
                                    </tr>
                                </thead>
                                <tbody className='small'>
                                    {table.getRowModel().rows.map(row => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className='small fw-bold'>
                                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
