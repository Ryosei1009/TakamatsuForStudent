import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const UserPolicy = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        利用規約 - TCFS
                    </title>
                </Helmet>
            </HelmetProvider>
            <div className="my-6 mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8">
                <div>
                    <div className="text-2xl font-bold">
                        高松キャンパス生徒向けウェブアプリケーション 利用規約
                    </div>
                    <div className="mx-4">
                        この規約は、お客様が、高松キャンパス生徒向けウェブアプリケーション運営陣（以下「本サービス運営陣」）が提供する「高松キャンパス生徒向けウェブアプリケーション」（以下「本サービス」）をご利用頂く際の取扱いにつき定めるものです。本規約に同意した上で本サービスをご利用ください。
                    </div>
                </div>

                <div>
                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第１条（定義）
                        </div>
                        <div className="mx-4">
                            本規約上で使用する用語の定義は、次に掲げるとおりとします。
                            <table>
                                <tr>
                                    <td className="align-top">1 </td>
                                    <td className="align-top">本サービス　</td>
                                    <td className="align-top">本サービス運営陣が運営するサービス及び関連するサービス</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第２条（本規約への同意）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">利用者は、本利用規約に同意頂いた上で、本サービスを利用できるものとします。</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第３条（規約の変更）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">本サービス運営陣は、利用者の承諾を得ることなく、いつでも、本規約の内容を改定することができるものとし、利用者はこれを異議なく承諾するものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">本サービス運営陣は、本規約を改定するときは、その内容について本サービス運営陣所定の方法により利用者に通知します。</td>
                            </tr>
                            <tr>
                                <td className="align-top">３ </td>
                                <td className="align-top">前本規約の改定の効力は、本サービス運営陣が前項により通知を行った時点から生じるものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">４ </td>
                                <td className="align-top">利用者は、本規約変更後、本サービスを利用した時点で、変更後の本利用規約に異議なく同意したものとみなされます。</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第4条（アカウントの管理）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">利用者は、利用に際して登録した情報（以下、「登録情報」といいます。メールアドレスやID・パスワード等を含みます）について、自己の責任の下、任意に登録、管理するものとします。利用者は、これを第三者に利用させ、または貸与、譲渡、名義変更などをしてはならないものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">本サービス運営陣は、登録情報によって本サービスの利用があった場合、利用登録をおこなった本人が利用したものと扱うことができ、当該利用によって生じた結果ならびにそれに伴う一切の責任については、利用登録を行った本人に帰属するものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">３ </td>
                                <td className="align-top">登録情報の管理は、利用者が自己の責任の下で行うものとし、登録情報が不正確または虚偽であったために利用者が被った一切の不利益および損害に関して、本サービス運営陣は責任を負わないものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">４ </td>
                                <td className="align-top">登録情報が盗用されまたは第三者に利用されていることが判明した場合、利用者は直ちにその旨を本サービス運営陣に通知するとともに、本サービス運営陣からの指示に従うものとします。</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第5条（個人情報の取り扱い）
                        </div>
                        <div className="mx-4">
                            個人情報及び利用者情報については、本サービス運営陣が別途定める<a className="hover:underline text-blue-500 cursor-pointer" href="/fromdev/privacypolicy">「高松キャンパス生徒向けウェブアプリケーションプライバシーポリシー」</a>に則り、適正に取り扱うこととします。
                        </div>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第6条（禁止行為）
                        </div>
                        <div className="mx-4">
                            本サービスの利用に際し、本サービス運営陣は、利用者に対し、次に掲げる行為を禁止します。本サービス運営陣において、利用者が禁止事項に違反したと認めた場合、利用の一時停止、退会処分その他本サービス運営陣が必要と判断した措置を取ることができます。
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">本サービス運営陣または第三者の知的財産権を侵害する行為</td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">本サービス運営陣または第三者の名誉・信用を毀損または不当に差別もしくは誹謗中傷する行為</td>
                            </tr>
                            <tr>
                                <td className="align-top">３ </td>
                                <td className="align-top">本サービス運営陣または第三者の財産を侵害する行為、または侵害する恐れのある行為</td>
                            </tr>
                            <tr>
                                <td className="align-top">４ </td>
                                <td className="align-top">本サービス運営陣または第三者に経済的損害を与える行為</td>
                            </tr>
                            <tr>
                                <td className="align-top">５ </td>
                                <td className="align-top">本サービス運営陣または第三者に対する脅迫的な行為</td>
                            </tr>
                            <tr>
                                <td className="align-top">５ </td>
                                <td className="align-top">
                                    利用者が以下の情報を投稿すること
                                    <table>
                                        <tr>
                                            <td className="align-top">（１）　</td>
                                            <td className="align-top">第三者の権利および財産に対して損害を与えるリスクのある情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（２）</td>
                                            <td className="align-top">第三者に対して有害な情報、第三者を身体的・心理的に傷つける情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（３）</td>
                                            <td className="align-top">犯罪や不法行為、危険行為に属する情報およびそれらを教唆、幇助する情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（４）</td>
                                            <td className="align-top">不法、有害、脅迫、虐待、人種差別、中傷、名誉棄損、侮辱、ハラスメント、扇動、不快を与えることを意図し、もしくはそのような結果を生じさせる恐れのある内容をもつ情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（５）</td>
                                            <td className="align-top">事実に反する、または存在しないと分かっている情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（６）</td>
                                            <td className="align-top">利用者自身がコントロール可能な権利を持たない情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（７）</td>
                                            <td className="align-top">第三者の著作権を含む知的財産権やその他の財産権を侵害する情報、公共の利益または個人の権利を侵害する情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（８）</td>
                                            <td className="align-top">わいせつ、児童ポルノまたは児童虐待にあたる画像、文書等の情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（９）</td>
                                            <td className="align-top">医師法などの法令に違反する情報</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">（１０）</td>
                                            <td className="align-top">その他本サービス運営陣が不適切と判断する情報</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-top">６ </td>
                                <td className="align-top">コンピューターウィルス、有害なプログラムを仕様またはそれを誘発する行為</td>
                            </tr>
                            <tr>
                                <td className="align-top">７ </td>
                                <td className="align-top">本サービス用インフラ設備に対して過度な負担となるストレスをかける行為</td>
                            </tr>
                            <tr>
                                <td className="align-top">８ </td>
                                <td className="align-top">当サイトのサーバーやシステム、セキュリティへの攻撃</td>
                            </tr>
                            <tr>
                                <td className="align-top">９ </td>
                                <td className="align-top">本サービス運営陣提供のインターフェース以外の方法で本サービスにアクセスを試みる行為</td>
                            </tr>
                            <tr>
                                <td className="align-top">10 </td>
                                <td className="align-top">上記の他、本サービス運営陣が不適切と判断する行為</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第7条（コンテンツの取り扱い）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">利用者は､本サービスのコンテンツを本サービス運営陣の定める範囲内でのみ使用することができるものとします｡</td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">本サービスで提供される全てのコンテンツに関する権利は本サービス運営陣が有しており､利用者に対し､本サービス運営陣が有する特許権､実用新案権､ 意匠権､商標権､著作権､その他知的財産権の実施または使用許諾をするものではありません｡</td>
                            </tr>
                            <tr>
                                <td className="align-top">３ </td>
                                <td className="align-top">利用者は､本サービス運営陣の定める使用範囲を超えていかなる方法によっても複製､送信､譲渡（利用者同士の売買も含みます）､貸与､翻訳､翻案、無断で転載、二次使用、営利目的の使用、改変、逆アセンブル、逆コンパイル、リバースエンジニアリング等を行う事を禁止します。</td>
                            </tr>
                            <tr>
                                <td className="align-top">４ </td>
                                <td className="align-top">利用者が、本サービス上に投稿その他の方法で送信したコンテンツ（静止画、動画、文字情報その他一切の情報）に関する著作権（著作権法第21条ないし同第28条に規定する権利を含む全ての著作権を含む。）については利用者に帰属するものとします。ただし、利用者は、コンテンツの送信時に、本サービス運営陣に対し、日本国内外において、当該コンテンツを無償かつ非独占的に使用することを許諾します。</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第8条（免責）
                        </div>
                        <table className="mx-4">
                            <tr>
                                <td className="align-top">１ </td>
                                <td className="align-top">本サービス運営陣は、本サービスの内容変更、中断、終了によって生じたいかなる損害についても、一切責任を負いません。</td>
                            </tr>
                            <tr>
                                <td className="align-top">２ </td>
                                <td className="align-top">本サービス運営陣は、利用者の本サービスの利用環境について一切関与せず、また一切の責任を負いません。</td>
                            </tr>
                            <tr>
                                <td className="align-top">３ </td>
                                <td className="align-top">本サービス運営陣は、本サービスが利用者の特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、利用者による本サービスの利用が利用者に適用のある法令または業界団体の内部規則等に適合すること、および不具合が生じないことについて、何ら保証するものではありません。</td>
                            </tr>
                            <tr>
                                <td className="align-top">４ </td>
                                <td className="align-top">本サービス運営陣は、本サービスが全ての情報端末に対応していることを保証するものではなく、本サービスの利用に供する情報端末のＯＳのバージョンアップ等に伴い、本サービスの動作に不具合が生じる可能性があることにつき、利用者はあらかじめ了承するものとします。本サービス運営陣は、かかる不具合が生じた場合に本サービス運営陣が行うプログラムの修正等により、当該不具合が解消されることを保証するものではありません。</td>
                            </tr>
                            <tr>
                                <td className="align-top">５ </td>
                                <td className="align-top">本サービス運営陣は、本サービスを利用したことにより直接的または間接的に利用者に発生した損害について、一切賠償責任を負いません。</td>
                            </tr>
                            <tr>
                                <td className="align-top">６ </td>
                                <td className="align-top">本サービス運営陣は、利用者その他の第三者に発生した機会逸失、業務の中断その他いかなる損害（間接損害や逸失利益を含みます）に対して、本サービス運営陣が係る損害の可能性を事前に通知されていたとしても、一切の責任を負いません。</td>
                            </tr>
                            <tr>
                                <td className="align-top">７ </td>
                                <td className="align-top">他の利用者または第三者から投稿についての削除依頼があった時、本サービス運営陣の判断で削除の可否を決定できるものとし、当該判断により生じた一切の責任について、本サービス運営陣は責任を負わないものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">８ </td>
                                <td className="align-top">第１項乃至前項の規定は、本サービス運営陣に故意または重過失が存する場合又は契約書が消費者契約法上の消費者に該当する場合には適用しません。</td>
                            </tr>
                            <tr>
                                <td className="align-top">９ </td>
                                <td className="align-top">前項が適用される場合であっても、本サービス運営陣は、過失（重過失を除きます。）による行為によって利用者に生じた損害のうち、特別な事情から生じた損害については、一切賠償する責任を負わないものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">10 </td>
                                <td className="align-top">第１項乃至前項の規定は、本サービス運営陣に故意または重過失が存する場合又は契約書が消費者契約法上の消費者に該当する場合には適用しません。</td>
                            </tr>
                            <tr>
                                <td className="align-top">11 </td>
                                <td className="align-top">利用者は、本サービスの利用に関連し、他の利用者に損害を与えた場合または第三者との間に紛争を生じた場合、自己の費用と責任において、かかる損害を賠償またはかかる紛争を解決するものとし、本サービス運営陣には一切の迷惑や損害を与えないものとします。</td>
                            </tr>
                            <tr>
                                <td className="align-top">12 </td>
                                <td className="align-top">本サービスで他の利用者が投稿した情報の正確性について、本サービス運営陣は保証しません。本サービス運営陣は、本サービスに掲載されている情報についての紛争及びトラブルについて一切の責任を負いません。</td>
                            </tr>
                        </table>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第９条（本サービス運営陣への連絡方法）
                        </div>
                        <div className="mx-4">
                            本サービスに関する利用者の本サービス運営陣へのご連絡・お問い合わせは、N/S高等学校SlackのSlack名「しの, Ryosei Shinohara」へのDMまたは本サービス運営陣が別途指定する方法により行うものとします。
                        </div>
                    </div>

                    <div className="my-6">
                        <div className="text-xl font-bold">
                            第１０条（準拠法）
                        </div>
                        <div className="mx-4">
                            本規約の有効性，解釈及び履行については，日本法に準拠し，日本法に従って解釈されるものとする。
                        </div>
                    </div>
                </div>

                <div>
                    2024年3月8日　施行
                </div>
            </div>
        </>
    )
}

export default UserPolicy