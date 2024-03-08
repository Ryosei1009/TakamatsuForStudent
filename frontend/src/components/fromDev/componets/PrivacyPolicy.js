import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PrivacyPolicy = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        プライバシーポリシー - TCFS
                    </title>
                </Helmet>
            </HelmetProvider>
            <div className="my-6 mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8">
                <div>
                    <div className="text-2xl font-bold">
                        高松キャンパス生徒向けウェブアプリケーション プライバシーポリシー
                    </div>
                    <div className="mx-4">
                        高松キャンパス生徒向けウェブアプリケーション運営陣（以下「本サービス運営陣」）が提供する「高松キャンパス生徒向けウェブアプリケーション」（以下「本サービス」）における，利用者の個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
                    </div>
                </div>

                <div>
                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第１条（個人情報）
                        </div>
                        <div className="mx-4">
                            「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                        </div>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第２条（個人情報の収集方法）
                        </div>
                        <div className="mx-4">
                            本サービス運営陣は，利用者が利用登録をする際に氏名，メールアドレスなどの個人情報をお尋ねすることがあります。また、本サービスにアクセスした際にIPアドレス、アクセス中のデバイス・ブラウザを収集することがあります。
                        </div>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第３条（個人情報を収集・利用する目的）
                        </div>
                        <div className="mx-4">
                            本サービス運営陣が個人情報を収集・利用する目的は，以下のとおりです。
                            <table>
                                <tr>
                                    <td className="align-top">１ </td>
                                    <td className="align-top">本サービスの提供・運営のため</td>
                                </tr>
                                <tr>
                                    <td className="align-top">２ </td>
                                    <td className="align-top">利用者からのお問い合わせに回答するため（本人確認を行うことを含む）</td>
                                </tr>
                                <tr>
                                    <td className="align-top">３ </td>
                                    <td className="align-top">利用規約に違反した利用者や，不正・不当な目的でサービスを利用しようとする利用者の特定をし，ご利用をお断りするため</td>
                                </tr>
                                <tr>
                                    <td className="align-top">４ </td>
                                    <td className="align-top">利用者にご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため</td>
                                </tr>
                                <tr>
                                    <td className="align-top">５ </td>
                                    <td className="align-top">上記の利用目的に付随する目的</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第４条（利用目的の変更）
                        </div>
                        <div className="mx-4">
                            本サービス運営陣が個人情報を収集・利用する目的は，以下のとおりです。
                            <table>
                                <tr>
                                    <td className="align-top">１ </td>
                                    <td className="align-top">本サービス運営陣は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。</td>
                                </tr>
                                <tr>
                                    <td className="align-top">２ </td>
                                    <td className="align-top">本サービス運営陣は、利用目的の変更するときは、その内容について本サービス運営陣所定の方法により利用者に通知します。</td>
                                </tr>
                                <tr>
                                    <td className="align-top">３ </td>
                                    <td className="align-top">前利用目的の変更の効力は、本サービス運営陣が前項により通知を行った時点から生じるものとします。</td>
                                </tr>
                                <tr>
                                    <td className="align-top">４ </td>
                                    <td className="align-top">利用者は、利用目的の変更後、本サービスを利用した時点で、変更後の本利用規約に異議なく同意したものとみなされます。</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第５条（個人情報の第三者提供）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">
                                    本サービス運営陣は，次に掲げる場合を除いて，あらかじめ利用者の同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
                                    <table>
                                        <tr>
                                            <td className="align-top">（１）</td>
                                            <td className="align-top">人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（２）</td>
                                            <td className="align-top">公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（３）</td>
                                            <td className="align-top">国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（４）</td>
                                            <td className="align-top">
                                                予め次の事項を告知あるいは公表し，かつ本サービス運営陣が個人情報保護委員会に届出をしたとき
                                                <table>
                                                    <tr>
                                                        <td className="align-top">①</td>
                                                        <td className="align-top">利用目的に第三者への提供を含むこと</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-top">②</td>
                                                        <td className="align-top">第三者に提供されるデータの項目</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-top">③</td>
                                                        <td className="align-top">第三者への提供の手段または方法</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-top">④</td>
                                                        <td className="align-top">本人の求めに応じて個人情報の第三者への提供を停止すること</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-top">⑤</td>
                                                        <td className="align-top">本人の求めを受け付ける方法</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">
                                    前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
                                    <table>
                                        <tr>
                                            <td className="align-top">（１）</td>
                                            <td className="align-top">本サービス運営陣が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（２）</td>
                                            <td className="align-top">合併その他の事由による事業の承継に伴って個人情報が提供される場合</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（３）</td>
                                            <td className="align-top">個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第６条（個人情報の開示）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">
                                    本サービス運営陣は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。
                                    <table>
                                        <tr>
                                            <td className="align-top">（１）</td>
                                            <td className="align-top">本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（２）</td>
                                            <td className="align-top">本サービス運営陣の業務の適正な実施に著しい支障を及ぼすおそれがある場合</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（３）</td>
                                            <td className="align-top">その他法令に違反することとなる場合</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第７条（個人情報の訂正および削除）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">利用者は，本サービスの保有する自己の個人情報が誤った情報である場合には，本サービス運営陣が定める手続きにより，本サービス運営陣に対して個人情報の訂正，追加または削除（以下「訂正等」）を請求することができます。</td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">本サービス運営陣は，利用者から前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">３ </td>
                                <td className="align-top">本サービス運営陣は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これを利用者に通知します。</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第８条（個人情報の利用停止等）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">本サービス運営陣は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。</td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。</td>
                            </tr>
                            <tr>
                                <td className="align-top">３ </td>
                                <td className="align-top">本サービス運営陣は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これを利用者に通知します。</td>
                            </tr>
                            <tr>
                                <td className="align-top">４ </td>
                                <td className="align-top">前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，利用者の権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第９条（プライバシーポリシーの変更）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，利用者に通知することなく，変更することができるものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">本サービス運営陣が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div>
                    2024年3月8日　施行
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy