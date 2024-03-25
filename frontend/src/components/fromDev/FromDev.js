import React, { useState } from 'react'
import UserPolicy from './componets/UserPolicy';
import PrivacyPolicy from './componets/PrivacyPolicy';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import DevNews from './componets/devNews/News';

const FromDev = () => {
    const [userOpen, setUserOpen] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);

    return (
        <div className="my-6 mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 max-sm:mx-3">
            <div className="text-5xl font-bold">
                運営から
            </div>
            <div>
                <div className="text-3xl font-bold mt-6">
                    このサイトについて
                </div>
                <div className="mt-2">
                    本サービスは、N・S高等学校の高松キャンパスの生徒向けのウェブアプリケーション(高松キャンパス生徒向けウェブアプリケーション)です。高松キャンパスの生徒がより快適にキャンパスライフを送るために開発しています。また、更に快適にキャンパスライフを送れるような機能も追加していく予定です。
                </div>
                <div className="mt-2">
                    要望、バグ報告などがある場合は、本サービス運営(Slack名: しの[Ryosei Shinohara])までお問い合わせください。
                </div>
                <div className="mt-2 flex justify-end">
                    24/3/8 更新
                    <br />
                    24/3/24 更新
                </div>
            </div>
            <div className="mt-3">
                <div className="text-3xl font-bold mt-6">
                    運営からのお知らせ
                </div>
                <DevNews />
            </div>
            <div>
                <div onClick={() => setUserOpen(!userOpen)} className="flex cursor-pointer hover:opacity-60">
                    利用規約
                    {userOpen ? (
                        <ChevronUpIcon className="w-6"></ChevronUpIcon>
                    ) : (
                        <ChevronDownIcon className="w-6"></ChevronDownIcon>
                    )}
                </div>
                {userOpen && (
                    <UserPolicy />
                )}
            </div>
            <div>
                <button onClick={() => setPrivacyOpen(!privacyOpen)} className="flex cursor-pointer hover:opacity-60">
                    プライバシーポリシー
                    {privacyOpen ? (
                        <ChevronUpIcon className="w-6"></ChevronUpIcon>
                    ) : (
                        <ChevronDownIcon className="w-6"></ChevronDownIcon>
                    )}
                </button>
                {privacyOpen && (
                    <PrivacyPolicy />
                )}
            </div>
        </div>
    )
}

export default FromDev