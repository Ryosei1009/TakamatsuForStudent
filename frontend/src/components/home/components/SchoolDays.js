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
            console.log(month)
            if (2 < month && month < 6) {
                month = 5;
                setQuarter(1);
            }
            if (5 < month && month < 9) {
                month = 8;
                setQuarter(2);
            }
            if (8 < month && month < 12) {
                month = 11;
                setQuarter(3);
            }
            if (-1 < month && month < 3) {
                month = 2;
                setQuarter(4);
            }
            console.log(month)
            const endOfQuarter = new Date(new Date().getFullYear(), month, 30);
            const schoolDaysUntilQuarterEnd = jsonData[schoolDaysKey].filter(day => new Date(day) <= endOfQuarter).length;
            setRemainingDays(schoolDaysUntilQuarterEnd);
        };

        calculateRemainingDaysUntilQuarterEnd(setOneUntilQuarterEndRemaining, "SchoolDays1");
        calculateRemainingDaysUntilQuarterEnd(setThreeUntilQuarterEndRemaining, "SchoolDays3");
        calculateRemainingDaysUntilQuarterEnd(setFiveUntilQuarterEndRemaining, "SchoolDays5");
    }, []);

    return (
        <div className="flex justify-center border-t-8 border-black">
            <div class="max-w-240 min-w-80 w-240 flex bg-gray-200 rounded-lg py-8 p-4">
                <div class="w-1/3 flex flex-col items-center font-bold">
                    <div class="text-3xl mb-4">
                        週1日
                    </div>
                    <div class="flex items-center flex-col my-2">
                        <div class="text-2xl">　</div>
                        <div class="text-xl text-red-500">残り{oneUntilQuarterEndRemaining}日</div>
                    </div>
                    <div class="flex items-center flex-col my-2">
                        <div class="text-2xl">　</div>
                        <div class="text-xl text-red-500">残り{oneDayRemaining}日</div>
                    </div>
                </div>
                <div class="w-1/3 flex flex-col items-center font-bold">
                    <div class="text-3xl mb-4">
                        週3日
                    </div>
                    <div class="flex items-center flex-col my-2">
                        <div class="text-2xl">今クオーター</div>
                        <div class="text-xl text-red-500">残り{threeUntilQuarterEndRemaining}日</div>
                    </div>
                    <div class="flex items-center flex-col my-2">
                        <div class="text-2xl">今年度</div>
                        <div class="text-xl text-red-500">残り{threeDayRemaining}日</div>
                    </div>
                </div>
                <div class="w-1/3 flex flex-col items-center font-bold">
                    <div class="text-3xl mb-4">
                        週5日
                    </div>
                    <div class="flex items-center flex-col my-2">
                        <div class="text-2xl">　</div>
                        <div class="text-xl text-red-500">残り{fiveUntilQuarterEndRemaining}日</div>
                    </div>
                    <div class="flex items-center flex-col my-2">
                        <div class="text-2xl">　</div>
                        <div class="text-xl text-red-500">残り{fiveDayRemaining}日</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolDays;