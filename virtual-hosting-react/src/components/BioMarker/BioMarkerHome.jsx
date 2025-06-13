import React, { useEffect, useRef, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import '../../css/BioMarker/BioMarker.css';
import cdacLogo from '../../assets/CDAC.png';
import BioMarkerService from '../../service/BioMarkerService';
import { toast } from 'react-toastify';

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
    const [bioMarkerData, setBioMarkerData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const fileInputRef = useRef(null);


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0] || null);
    };

    const handleSaveClick = () => {
        if (!selectedFile) return;
        setIsSaving(true);

        BioMarkerService.saveFile(selectedFile)
            .then(res => {
                setBioMarkerData(res.data); // Update table data
                toast.success("Data uploaded successfully!");
            })
            .catch(err => {
                console.error("Upload error", err);
                toast.error("Upload failed");
            })
            .finally(() => {
                setIsSaving(false)
                setSelectedFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
            });
    };

    const handleDeleteAll = () => {
        BioMarkerService.deleteAll()
            .then(res => {
                toast.warn("Deleted all data");
                BioMarkerService.getAll()
                    .then(res => setBioMarkerData(res.data))
                    .catch(err => console.error("Failed to load data", err));
            })

    }

    useEffect(() => {
        // Load all existing BioMarkers on mount
        BioMarkerService.getAll()
            .then(res => setBioMarkerData(res.data))
            .catch(err => console.error("Failed to load data", err));
    }, []);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data: bioMarkerData,
        columns,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className='bg-light pb-2'>
            {/* Header */}
            <div className='py-2 bg-danger d-flex justify-content-between align-items-center'>
                <div>
                    <img src={cdacLogo} className='img-fluid ms-3' width='60px' alt="CDAC Logo" />
                </div>
                <div className='text-white display-6 text-center fw-bold'>Bio-Marker</div>
                <div></div>
            </div>

            <div className='p-3 m-5 mb-5'>
                <div className='row'>
                    {/* File Upload */}
                    <div className='col-12 card p-3 mb-3'>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label fw-bold text-decoration-underline">
                                Upload your file
                            </label>
                            <input className="form-control" ref={fileInputRef} type="file" id="formFile" onChange={handleFileChange} />
                        </div>
                        <div className='text-center'>
                            <button
                                className='btn btn-success'
                                onClick={handleSaveClick}
                                disabled={!selectedFile || isSaving}
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className='col-12 card p-3'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h5 className='mb-3 text-decoration-underline'>Data</h5>
                            </div>
                            <div>
                                <button className='btn btn-sm btn-danger' onClick={handleDeleteAll}>Delete All</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table shadow-sm table-bordered table-hover table-striped align-middle text-center mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th style={{ width: "25%" }}>Accession Number</th>
                                        <th style={{ width: "25%" }}>Lineage</th>
                                        <th style={{ width: "50%" }}>Sequence</th>
                                    </tr>
                                </thead>
                                <tbody className='small'>
                                    {table.getRowModel().rows.map(row => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <td style={
                                                    {
                                                        wordBreak: 'break-word',
                                                        textAlign: cell.column.columnDef.accessorKey === "sequence" ? 'left' : 'center'
                                                    }
                                                } key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
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
