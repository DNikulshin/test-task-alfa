interface Props {
    currentPage: number
    totalPages: number
    onPageChange: (currentPage: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    return (
        <div className="flex px-2 py-4 gap-4 justify-center items-center">
            <button
                className="bg-green-500/85 px-2 py-1 rounded-sm cursor-pointer disabled:bg-gray-500"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            > Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button
                className="bg-green-500/85 px-2 py-1 rounded-sm cursor-pointer disabled:bg-gray-500"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            > Next
            </button>
        </div>
    )
}

