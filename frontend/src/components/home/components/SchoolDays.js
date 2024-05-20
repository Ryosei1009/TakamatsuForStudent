import React, { useEffect, useState } from 'react';
import jsonData from './SchoolDays.json';

const SchoolDays = () => {
    const [oneDayRemaining, setOneDayRemaining] = useState(0);
    const [threeDayRemaining, setThreeDayRemaining] = useState(0);
    const [fiveDayRemaining, setFiveDayRemaining] = useState(0);
    const [oneUntilQuarterEndRemaining, setOneUntilQuarterEndRemaining] = useState(0);
    const [threeUntilQuarterEndRemaining, setThreeUntilQuarterEndRemaining] = useState(0);
    const [fiveUntilQuarterEndRemaining, setFiveUntilQuarterEndRemaining] = useState(0);
    const [quarter, setQuarter] = useState(0);

    useEffect(() => {
        const calculateRemainingDays = (setRemainingDays, schoolDaysKey) => {
            const today = new Date();
            const schoolDays = jsonData[schoolDaysKey].map(day => new Date(day));
            const remainingDays = schoolDays.filter(day => day >= today).length;
            setRemainingDays(remainingDays);
        };

        calculateRemainingDays(setOneDayRemaining, "SchoolDays1");
        calculateRemainingDays(setThreeDayRemaining, "SchoolDays3");
        calculateRemainingDays(setFiveDayRemaining, "SchoolDays5");

        const calculateRemainingDaysUntilQuarterEnd = (setRemainingDays, schoolDaysKey) => {
            let month = new Date().getMonth();
            if (2 < month && month < 6) {
                month = 5;
                setQuarter(1);
            } else if (5 < month && month < 9) {
                month = 8;
                setQuarter(2);
            } else if (8 < month && month < 12) {
                month = 11;
                setQuarter(3);
            } else if (-1 < month && month < 3) {
                month = 2;
                setQuarter(4);
            }

            const endOfQuarter = new Date(new Date().getFullYear(), month, 30);
            const today = new Date();
            const schoolDaysQuarterEnd = jsonData[schoolDaysKey].map(day => new Date(day));
            const remainingDays = schoolDaysQuarterEnd.filter(day => day <= endOfQuarter);
            const schoolDaysUntilQuarterEnd = remainingDays.filter(day => day >= today).length; // Calculate the length instead of using array directly

            setRemainingDays(schoolDaysUntilQuarterEnd); // Set the count of remaining days
        };

        calculateRemainingDaysUntilQuarterEnd(setOneUntilQuarterEndRemaining, "SchoolDays1");
        calculateRemainingDaysUntilQuarterEnd(setThreeUntilQuarterEndRemaining, "SchoolDays3");
        calculateRemainingDaysUntilQuarterEnd(setFiveUntilQuarterEndRemaining, "SchoolDays5");
    }, []);

    return (
        <div className="flex justify-center border-t-8 border-black">
            <div class="max-w-240 min-w-80 w-240 flex bg-gray-200 rounded-lg py-8 p-4">
                <table className="table w-full text-center font-bold">
                    <thead>
                        <tr className="text-4xl max-md:text-2xl">
                            <td className="w-3/12">

                            </td>
                            <td className="w-5/12">
                                第{quarter}クオーター
                            </td>
                            <td className="w-5/12">
                                今年度
                            </td>
                        </tr>
                    </thead>
                    <tbody className="text-3xl max-sm:text-xl text-red-500">
                        <tr>
                            <td className="text-4xl max-sm:text-2xl text-black pt-5">
                                週1日
                            </td>
                            <td>
                                残り{oneUntilQuarterEndRemaining}日
                            </td>
                            <td>
                                残り{oneDayRemaining}日
                            </td>
                        </tr>
                        <tr>
                            <td className="text-4xl max-sm:text-2xl text-black pt-5">
                                週3日
                            </td>
                            <td>
                                残り{threeUntilQuarterEndRemaining}日
                            </td>
                            <td>
                                残り{threeDayRemaining}日
                            </td>
                        </tr>
                        <tr>
                            <td className="text-4xl max-sm:text-2xl text-black pt-5">
                                週5日
                            </td>
                            <td>
                                残り{fiveUntilQuarterEndRemaining}日
                            </td>
                            <td>
                                残り{fiveDayRemaining}日
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SchoolDays;