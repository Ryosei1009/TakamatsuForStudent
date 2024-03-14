import React from 'react'
import { fetchData } from '../../../utils/DatabaseUtil';

const Search = ({ setSearchTerm, setPhotos, searchTerm }) => {

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        handleSearch(newSearchTerm);
    };

    const handleSearch = async (searchTerm) => {
        try {
            const fetchedPhotos = await fetchData('/api/photos');
            const filteredPhotos = fetchedPhotos.filter((photo) => {
                return photo.tags.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setPhotos(filteredPhotos);
        } catch (error) {
            console.error("Error handling search:", error);
        }
    }
    return (
        <>
            <div className="ml-4 mt-4 text-3xl font-bold">
                フィルタリグ
            </div>
            <div className="p-4">
                <select
                    value={searchTerm}
                    onChange={handleSearchChange}
                    required
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                >
                    <option value="" disabled>選択してください。</option>
                    <option value="放課後">放課後</option>
                    <option value="イベント">イベント</option>
                    <option value="その他">その他</option>
                    <option value="">リセット</option>
                </select>
            </div>
        </>
    )
}

export default Search