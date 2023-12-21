import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { reload, setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Router from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {
  nextStep: () => void;
}

export default function Legal({ nextStep }: Props) {
  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/accept/terms`
  );

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      dispatch(reload());
      nextStep();
    }
  }, [data]);

  return (
    <Box>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        lineHeight="20px"
      >
        These are te terms of use and conditions surrounding the Alliance Pay
        solution. Kindly read through and accept below.
      </Typography>
      {/* ––––––– content ------- */}
      {/* ------––––––––––––––––– */}
      <Stack className="c15 c18 doc-content">
        <p className="c8">
          <span className="c6 c10">Terms and Conditions for Business</span>
        </p>
        <p className="c0">
          <span className="c4">
            The Alliance Pay(ALLIANCE PAY PLATFORM) Standard Terms and
            Conditions (T&amp;C) represent the legal attributes of the ALLIANCE
            PAY PLATFORM service provided by Alliance Pay Limited (Alliance
            Pay). The content is binding and is not subject to any varying terms
            or conditions unless provided by Alliance Pay subsequently upon
            notice to the User.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            Users who are under 18 years of age should review this T&amp;C with
            a parent or guardian.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            By accepting this T&amp;C, you agree to be bound by this T&amp;C and
            as amended at any time and posted on the website. Do not access the
            ALLIANCE PAY PLATFORM if you disagree with any part.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            In addition, the User&rsquo;s use of the ALLIANCE PAY PLATFORM shall
            be subject to any applicable card scheme rule, applicable regulatory
            guidelines or any other rules/provision communicated by Alliance Pay
            from time to time. All such guidelines or rules are hereby
            incorporated by reference into this T&amp;C.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">1.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">
            DESCRIPTION OF THE ALLIANCE PAY BUSINESS PLATFORM
          </span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            ALLIANCE PAY PLATFORM is a multi-channel web and mobile acquiring
            payment gateway that enables Users to accept payments via credit and
            debit cards, Unstructured Supplementary Service Data (USSD) and
            Quick Response (QR). It also allows Users to split the settlement of
            funds received via the ALLIANCE PAY PLATFORM into multiple bank
            accounts.
          </span>
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">2.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">ALLIANCE PAY BUSINESS PLATFORM LICENCE</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">2.1.&nbsp;</span>
          <span className="c4">
            Alliance Pay grants User the right to use the ALLIANCE PAY PLATFORM
            on the User&rsquo;s website or mobile application, and the User
            agrees to abide by the terms and conditions of this
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">T&amp;C.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">2.2.&nbsp;</span>
          <span className="c4">
            Alliance Pay grants to User a non-exclusive, non-transferable
            license to use ALLIANCE PAY PLATFORM for the term of this T&amp;C
            solely to collect payments via its website (communicated to and
            approved by Alliance Pay in writing) for its goods and services
            (communicated to and approved by Alliance Pay in writing). Unless
            authorised explicitly under this T&amp;C, User must not sub-license,
            transfer, or assign its right to use ALLIANCE PAY PLATFORM.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">2.3.&nbsp;</span>
          <span className="c4">
            User must comply with the implementation and use requirements
            contained in all Alliance Pay documentation accompanying the
            ALLIANCE PAY PLATFORM and communicate to the User from time to time.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">3.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">USER RESPONSIBILITIES AND</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">UNDERTAKINGS</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.1.&nbsp;</span>
          <span className="c4">The User</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">shall:</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            not make any warranty or representation whatsoever in relation to
            ALLIANCE PAY PLATFORM which may bind Alliance Pay or make it liable
            in any way
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">whatsoever.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            comply with all security or encryption standards, rules and
            procedures imposed by
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">Alliance Pay.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">c.&nbsp;</span>
          <span className="c4">
            be and remain Payment Card Industry Data Security Standard (PCIDSS)
            compliant (where required by Alliance Pay) and be in compliance with
            applicable card scheme security requirements during the term of this
            T&amp;C.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">d.&nbsp;</span>
          <span className="c4">
            where required by Alliance Pay, provide copy of its PCIDSS
            compliance Certificate, applicable documentation such as Attestation
            Of Compliance and Report Of Compliance where applicable and every
            renewal thereof.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">e.&nbsp;</span>
          <span className="c4">
            where required by Alliance Pay, ensure it has implemented a fraud
            protection and monitoring tool of the highest standard and provide
            evidence of same to Alliance Pay.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">f.&nbsp;</span>
          <span className="c4">
            make connections to such other systems as Alliance Pay may require
            from time to
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">time;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">g.&nbsp;</span>
          <span className="c4">
            Inform Alliance Pay of any change in the particulars of its
            designated bank
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            account/settlement account, such change will not be effected until
            the User has provided evidence to Alliance Pay that it has
            communicated this change to the former Settlement Bank.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">h.&nbsp;</span>
          <span className="c4">
            not use any cardholder payment card details including but not
            limited to Primary Account Number (PAN) or Card Number, Personal
            Identification Number (PIN), Card Verification Value
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            (CVV) for any
            <br />
            purpose other than for the facilitation of the payment authorized by
            the
            <br />
            cardholder.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">i.&nbsp;</span>
          <span className="c4">
            keep any approved digital certificates for a site authentication
            current and valid and take all necessary measures to protect the
            security and secrecy of its site
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">certificates.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">j.&nbsp;</span>
          <span className="c4">
            notify Alliance Pay of any change to the internet protocol address
            of its website used for payment
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">transactions.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">k.&nbsp;</span>
          <span className="c4">
            not offer for sale on its site, any goods or services not expressly
            stated during registration of the User&rsquo;s website with Alliance
            Pay. Upon default by User, Alliance Pay shall without any liability,
            immediately withdraw its services and thereby terminate the ALLIANCE
            PAY PLATFORM service provided under these T&amp;Cs.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">l.&nbsp;</span>
          <span className="c4">
            only accept payments and/or process refunds from cardholders or
            customers in connectio with goods and/or services which have been
            supplied to the relevant cardholder or
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">customer.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">m.&nbsp;</span>
          <span className="c4">
            perform the necessary KYC (Know your customer) &amp; due diligence
            on all its customers.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">n.&nbsp;</span>
          <span className="c4">
            implement a two factor authentication system as required by the
            Central Bank of Nigeria.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">o.&nbsp;</span>
          <span className="c4">
            upon request by Arca Pay, provide KYC documentation/information
            relating to any of its customers.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">p.&nbsp;</span>
          <span className="c4">
            ensure that it has adequate controls, safeguards, information
            technology security and effective internal controls for all its
            operations.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">q.&nbsp;</span>
          <span className="c4">
            not and shall not permit its affiliates or any third party to
            translate, reverse engineer, decompile, recompile, update or modify
            all or any part of the ALLIANCE PAY PLATFORM or merge the ALLIANCE
            PAY PLATFORM into any other solution.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">r.&nbsp;</span>
          <span className="c4">
            comply with the provisions of all applicable regulations including
            the Central Bank of Nigeria&rsquo;s Regulation for Direct Debit
            Scheme in Nigeria, 2018 (Revised), and any amendments there to.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">s.&nbsp;</span>
          <span className="c4">
            comply with and implement the requirements of the Nigeria Data
            Protection Regulation (NDPR).
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">t.&nbsp;</span>
          <span className="c4">
            provide to and maintain with Alliance Pay correct and updated
            information at all times.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">u.&nbsp;</span>
          <span className="c4">
            provide Alliance Pay with written confirmation of its nominated
            Settlement Bank and its account details with the Settlement Bank,
            which shall be accompanied by written acceptance from the bank to
            act as the Settlement Bank, in the template and format furnished by
            Alliance Pay.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">v.&nbsp;</span>
          <span className="c4">
            Where required by Alliance Pay, issue a letter of authorization to
            it nominated Settlement Bank, giving Alliance Pay the authority to
            debit its Settlement account in the event where the next day
            settlement amount is not sufficient to net off outstanding
            chargeback claims liabilities.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">w.&nbsp;</span>
          <span className="c4">
            provide Alliance Pay promptly with all information and/or documents
            required by it to validate User&rsquo;s identity.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">x.&nbsp;</span>
          <span className="c4">
            be responsible for maintaining adequate security and control of any
            and all IDs, passwords, personal identification numbers (PINs), or
            any other codes that it uses to access the ALLIANCE PAY PLATFORM.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">y&nbsp;</span>
          <span className="c4">
            comply with the Acceptable Use Policy or any other Policy or
            agreement communicated by Alliance Pay;&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">bb.&nbsp;</span>
          <span className="c4">
            not engage in any illegal or suspicious activity and/or
            transactions;&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">cc.&nbsp;</span>
          <span className="c4">
            not use the services in a manner that Alliance Pay, a card scheme or
            any other electronic funds transfer network reasonably believes to
            be an abuse of the card system or a violation of card association or
            network
            <br />
            rules;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">dd.&nbsp;</span>
          <span className="c4">
            not disclose or distribute another user&#39;s Information to a third
            party or use the Information for marketing purposes unless with
            written consent of the owner.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">ee.&nbsp;</span>
          <span className="c4">
            not facilitate any viruses, Trojan horses, worms or other computer
            programming routines that may damage, detrimentally interfere with,
            <br />
            surreptitiously intercept or expropriate any system, data or
            Information;&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">ff.&nbsp;</span>
          <span className="c4">
            not use an anonymizing proxy; use any robot, spider, other automatic
            device, or manual process to monitor or copy Alliance Pay&rsquo;s
            platform without the prior written consent of Alliance Pay;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">gg.&nbsp;</span>
          <span className="c4">
            not use any device, software or routine to bypass our robot
            exclusion headers, or interfere or attempt to interfere with
            <br />
            Alliance Pay&rsquo;s website or services.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">hh.&nbsp;</span>
          <span className="c4">
            not use or display any card scheme acceptance mark upon termination
            of this T&amp;C or upon notification by Alliance Pay to
            <br />
            discontinue such use or display.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">ii.&nbsp;</span>
          <span className="c4">
            ensure any use of a card scheme acceptance mark in advertising,
            acceptance decals, or signs, must be in accordance with the
            standards
            <br />
            of the applicable card scheme, as may be in effect from time to
            time;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">jj.&nbsp;</span>
          <span className="c4">
            maintain a policy that does not discriminate among customers seeking
            to make purchases with a payment card.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">kk.&nbsp;</span>
          <span className="c4">
            not engage in any acceptance practice that discriminates against or
            discourages the use of a payment card in favor of any other
            <br />
            acceptance brand.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">ll.&nbsp;</span>
          <span className="c4">
            not require, or indicate that it requires, a minimum or maximum
            transaction amount to accept a valid and properly presented payment,
            except as mandated by applicable laws and regulations.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">mm.&nbsp;</span>
          <span className="c4">
            not impose, as a condition of card acceptance, a requirement that
            the cardholder waive a right to dispute a transaction.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">nn.&nbsp;</span>
          <span className="c4">
            be responsible for the conduct of its employees, agents, and
            representatives.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">oo.&nbsp;</span>
          <span className="c4">
            prominently and clearly disclose to the cardholder at all points of
            interaction:
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">&nbsp;</span>
          <span className="c4">I.</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            the name of the merchant, so that the cardholder can easily
            distinguish the merchant from any other party, such as a supplier of
            <br />
            products or services to the Merchant; and
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">&nbsp;</span>
          <span className="c4">II.</span>
          <span className="c5">
            &nbsp;The merchant&#39;s location (physical address){" "}
          </span>
          <span className="c4">
            to enable the cardholder to easily determine, among other things,
            whether the transaction will be a Domestic Transaction or a
            Cross-border transaction.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">pp.&nbsp;</span>
          <span className="c4">
            disclose its location before the cardholder is prompted to provide
            Card information.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">qq.&nbsp;</span>
          <span className="c4">
            ensure the name and country location, as disclosed to the Cardholder
            at the Point Of Interaction and on transaction receipts, is the same
            as what is provided in authorization and clearing transaction
            messages.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">rr.&nbsp;</span>
          <span className="c4">
            conduct its business and perform its obligations in compliance with
            applicable laws and regulations.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">ss.&nbsp;</span>
          <span className="c4">
            report all instances of a data compromise immediately to Alliance
            Pay, upon discovery.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">tt.&nbsp;</span>
          <span className="c4">
            comply with the applicable card scheme rules.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">uu.&nbsp;</span>
          <span className="c4">
            submit to any procedural and financial audits conducted by and on
            behalf of Alliance Pay or a card scheme.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">vv.&nbsp;</span>
          <span className="c4">
            fully cooperate with all investigation until completed, if
            undergoing a forensic investigation,&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">ww.&nbsp;</span>
          <span className="c4">
            if using, or intending to use, a service provider in connection with
            the ALLIANCE PAY PLATFORM or service hereunder, must:
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">&nbsp;</span>
          <span className="c4">I.</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            provide Alliance Pay with information on any service providers the
            merchant uses or intends to use.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">&nbsp;</span>
          <span className="c4">II.</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            validate the service providers are certified as compliant with the
            PCI DSS or a similarly established data security standard.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">xx.&nbsp;</span>
          <span className="c4">
            not engage in any activity that may create harm or loss to the
            goodwill of Alliance Pay or any applicable cards scheme&rsquo;s
            brand or payment system.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">
            yy.&nbsp;inform and obtain the consent of each customer prior to
            activating recurring payments for such customer.&nbsp;&nbsp;
          </span>
        </p>
        <p className="c0">
          <span className="c1">
            zz.&nbsp;ensure it selects the correct business category, during
            onboarding on the platform.&nbsp;&nbsp;
          </span>
        </p>
        <p className="c0">
          <span className="c1">
            aaa.&nbsp;be aware of the possibility of a chargeback, and regularly
            check-in and provide evidence for such, so its account is not
            debited and/or suspended
          </span>
        </p>
        <p className="c0">
          <span className="c1">
            bbb.&nbsp;keep all transaction records and proof of value being
            given to the customer, for presentation when a claim or chargeback
            is logged against it.&nbsp;&nbsp;
          </span>
        </p>
        <p className="c0">
          <span className="c1">
            ccc.&nbsp;put operational structures and processes in place to
            attend to all customer concerns including chargeback claims.&nbsp;
          </span>
        </p>
        <p className="c0">
          <span className="c1">
            ddd.&nbsp;inform Alliance Pay in writing of any changes to its
            ownership structure.&nbsp;
          </span>
        </p>
        <p className="c0">
          <span className="c1">
            eee.&nbsp;ensure its refund policy is clearly visible to all
            customers on its platform.&nbsp;&nbsp;
          </span>
        </p>
        <p className="c0">
          <span className="c1">
            fff.&nbsp;give authorization to Alliance Pay to debit its settlement
            account for claims against it and understands that all
            liabilities/claims under this Agreement shall be treated as a loan
            and in this regard gives Alliance Pay a Global Standing Instruction
            (GSI) to access to all existing
            <br />
            accounts in Nigeria.&nbsp;
          </span>
        </p>
        <p className="c0">
          <span className="c5">
            ggg.&nbsp;fully support Alliance Pay or its agents, in the recovery
            process for fraud committed by it, its customers, employees,
            representatives, agents, or by any 3
          </span>
          <span className="c5 c9">rd&nbsp;</span>
          <span className="c1">party.&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">
            hhh.&nbsp;promptly provide all information/documentation requested
            by Alliance Pay pursuant to clause ggg above.&nbsp;&nbsp;
          </span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.2.&nbsp;</span>
          <span className="c4">
            Unless otherwise agreed by the Parties in writing, User acknowledges
            and agrees that it shall (at own cost) be solely responsible
            throughout the duration of this T&amp;C for the provision of all
            such equipment, software, systems and telecommunications facilities
            which are required to enable User to receive the
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">Services.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.3.&nbsp;</span>
          <span className="c4">
            The User agrees that only the website expressly stated upon its
            registration with Alliance Pay shall be integrated to ALLIANCE PAY
            PLATFORM and derive the services
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">provided.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.4.&nbsp;</span>
          <span className="c4">
            In order to permit the User&rsquo;s website to inter-operate with
            Alliance Pay payments systems, User will be provided with
            Application Programming Interface codes to be installed on
            User&rsquo;s website. User shall have full responsibility for the
            integration process and Alliance Pay shall not be liable for any
            fault or failure to integrate to the payment systems. All
            Integration however, shall be subject to passing Alliance
            Pay&rsquo;s Integration acceptance tests prior to go live.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.5.&nbsp;</span>
          <span className="c4">
            The User shall be liable for (including without limitation, all
            charges, losses or damages whatsoever arising
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">from):</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            data stored or transmitted on or through the ALLIANCE PAY PLATFORM;
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">or</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            any use of the passwords or identification codes assigned by
            Alliance Pay.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.6.&nbsp;</span>
          <span className="c4">
            The User shall observe and comply with all security measures and
            instructions prescribed by Alliance Pay, any applicable card scheme
            or any bank in respect of any card transactions or customer
            (cardholder)
            <br />
            payment
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">instruction.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.7.&nbsp;</span>
          <span className="c4">
            The User shall promptly notify Alliance Pay of any security breach,
            misuse, irregularity, suspected fraudulent transaction, account
            numbers or suspicious activities that may be connected with attempts
            to commit fraud or other illegal activity throughout the duration of
            use of this T&amp;C.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.8.&nbsp;</span>
          <span className="c4">
            The User shall be solely responsible to and for its online customers
            (cardholders) on its site and use thereof of the payment systems.
            The User understands and agrees that under no circumstances shall
            use of the site or payment systems imply that Alliance Pay endorses,
            sponsors, certifies or otherwise guarantees the sale or use of the
            User&rsquo;s
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">products.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.9.&nbsp;</span>
          <span className="c4">
            The User shall take all steps to keep secure and confidential any
            information or data related to transactions initiated on the
            User&rsquo;s website. In the event any such information is lost,
            stolen or otherwise compromised, the User shall forthwith report and
            give written notice of such occurrence to Alliance Pay whereupon the
            User shall take immediate steps to remedy the situation and prevent
            its
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">reoccurrence.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">3.10.&nbsp;</span>
          <span className="c4">The User is prohibited from:</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            accepting cardholder payments for previously disputed card charges
            incurred at the User&rsquo;s location/website.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            submitting any transaction into the payment system that is illegal
            or that the User knows or should have known was illegal. The
            transactions must be legal in both the cardholder&rsquo;s and
            User&rsquo;s jurisdiction.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">c.&nbsp;</span>
          <span className="c4">
            Submitting a transaction into the payment system that the User knows
            or should have known to be either fraudulent or not authorized by
            the cardholder.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">d.&nbsp;</span>
          <span className="c4">
            requiring a cardholder to complete a postcard or similar device that
            includes any of the following in plain view when mailed: the
            cardholder&rsquo;s account number, card expiration date, signature,
            or any other card account data.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">e.&nbsp;</span>
          <span className="c4">
            requesting the Card Verification Value 2 (CVV2) data on any paper
            order form.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">f.&nbsp;</span>
          <span className="c4">
            disbursing funds in the form of cash to a cardholder.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">g.&nbsp;</span>
          <span className="c4">
            creating a transaction for a cardholder that is attempting to
            refinance a bad check or a past due amount.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">h.&nbsp;</span>
          <span className="c4">
            submitting transactions on behalf of other entities.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">i.&nbsp;</span>
          <span className="c4">
            splitting a transaction to avoid a single Authorization for the full
            amount of the purchase.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">4.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">TRANSACTION LIMITS&nbsp;</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            Alliance Pay reserves the right to impose transaction limits on
            the&nbsp;
          </span>
          <span className="c4 c7">ALLIANCE PAY PLATFORM&nbsp;</span>
          <span className="c4">
            for any reason upon notice to the User.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">5.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">SERVICES FEES AND</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">CHARGES</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">5.1.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall be entitled to a fee per successful transaction
            via the ALLIANCE PAY PLATFORM as detailed below:
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">&nbsp;</span>
          <span className="c4">
            a. 1.5% fee (with a maximum cap of N2,000) per successful card
            transaction; VAT exclusive
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">&nbsp;</span>
          <span className="c4">
            b. For every successful transactions done with international card,
            the fee is 3.8%, VAT exclusive.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">5.2.&nbsp;</span>
          <span className="c4">
            Alliance Pay reserves the right to revise such fees and any charges
            from time to time upon notice to the User.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">5.3.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall deduct all fees and charges from successful
            transactions before remitting to User.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">5.4.&nbsp;</span>
          <span className="c4">
            All payments required to be made by the User on this service shall
            be payable without any deduction, claim, counterclaim, setoff,
            notice or&nbsp;demand.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">5.5.&nbsp;</span>
          <span className="c4">
            No fee nor charges incurred by the User under this service shall be
            refundable in the event of termination howsoever caused.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">5.6.&nbsp;</span>
          <span className="c4">
            The User acknowledges that Alliance Pay may be subject to complying
            with instructions received from participating banks within the
            <br />
            Alliance Pay network in respect of any transaction on/to the
            User&rsquo;s designated account and agrees that no liability shall
            be imputed to Alliance Pay for acting on any such instruction.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">5.7.&nbsp;</span>
          <span className="c4">
            If for any reason whatever, a Bank where the User&rsquo;s designated
            account is domiciled, ceases to belong to the Alliance Pay network,
            <br />
            the User shall within 14 working days upon receipt of written notice
            thereof from Alliance Pay, provide an account for the purpose of the
            transactions with any of the other participating
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">banks.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">5.8.&nbsp;</span>
          <span className="c4">
            Where claims go above 1% of the User&rsquo;s total sales processed
            within a month, Alliance Pay reserves the right to put the User on a
            chargeback monitoring service, which may be subject applicable fees,
            as communicated by Alliance Pay. A User shall be liable to fee and
            charges, at least 6 months after the last processed transaction. No
            transaction settlement shall occur on the non-settlement days
            provided
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">below:</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            any day where Banks in Nigeria are not open for
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">business.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            Sundays and public holidays as gazetted and declared in Nigeria;
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            in which case transactions effected on such days shall be paid and
            settled on the day immediately following which is not any of the
            aforesaid non-settlement days.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">.&nbsp;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">6.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">SETTLEMENT OF TRANSACTION</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">FUNDS</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">6.1.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall make settlements regularly of funds cleared and
            received by Alliance Pay to the Users account domiciled with the
            Settlement Bank, on a T+1 basis (&ldquo;T&rdquo; being the day after
            the transaction was conducted). The User shall have no right of
            objection to any received amount after the expiry of 7 clear
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">days.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">7.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">INDEMNITY</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">7.1.&nbsp;</span>
          <span className="c4">
            User shall indemnify and hold Alliance Pay harmless from and against
            all actions, proceedings, costs, claims, demands, charges, expenses
            (including legal expenses), liabilities, fines, levies, losses and
            damages, whether arising in tort, contract or common law, which
            Alliance Pay may suffer or incur to the extent arising out of or in
            consequence of or in connection with:
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            any claim brought against Alliance Pay by a Customer, Cardholder,
            Card Scheme, Card Issuer, Other Financial Institution, Acquirer or
            other third party arising from a Transaction whether or not
            previously remitted to
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">the User;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            any claim brought against Alliance Pay arising from any aspect of
            this T&amp;C (including but not limited to, and in connection with
            any security breach as described in this T&amp;C, compromise or
            theft of Data held by the User or on behalf of the User irrespective
            of whether such security breach, compromise or theft of Data was
            within or outside User&rsquo;s control);
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">c.&nbsp;</span>
          <span className="c4">
            the enforcement or attempted enforcement of this T&amp;C (which
            includes the recovery or attempted recovery of
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">any</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            sum owing to Alliance Pay under this T&amp;C);
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">d.&nbsp;</span>
          <span className="c4">
            the protection of Alliance Pay&rsquo;s interest in connection with
            any aspect of the parties&rsquo; relationship under this T&amp;C
            (including the cost of any third parties nominated by Alliance Pay
            or instructed by Alliance Pay for this
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">purpose);</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">e.&nbsp;</span>
          <span className="c4">
            a breach by the User of any of the provisions of this T&amp;C;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">f.&nbsp;</span>
          <span className="c4">
            any transaction (including a transaction which is subsequently
            discovered to be fraudulent);
          </span>
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">g.&nbsp;</span>
          <span className="c4">
            respect to any negligent act or omission by, or willful misconduct
            of the User or its agents; or
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">h.&nbsp;</span>
          <span className="c4">
            any modification of or addition to the ALLIANCE PAY PLATFORM not
            provided or approved by Alliance Pay.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">7.2.&nbsp;</span>
          <span className="c4">
            If You are a partnership, each partner shall be jointly and
            severally liable under this T&amp;C.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">7.3.&nbsp;</span>
          <span className="c4">
            In the event of the occurrence of an event that leads to any damage,
            loss, liability or expense to Alliance Pay as stated in this Clause
            7, the User hereby agrees and authorizes Alliance Pay to immediately
            debit its account at Settlement.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">7.4.&nbsp;</span>
          <span className="c4">
            User agrees that if a fraudulent activity is associated with the
            operation of its accounts, Alliance Pay shall have the right to
            apply restrictions to such account and report to appropriate law
            enforcement agencies.
          </span>
          <span className="c1">&nbsp;&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">8.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">CHARGEBACKS AND</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">REFUNDS</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.1.&nbsp;</span>
          <span className="c4">
            In certain circumstances, Card Issuers, Card Schemes and/or Other
            Financial Institutions may require repayment in respect of a
            transaction previously settled and/or remitted to a User,
            notwithstanding that
            <br />
            authorisation may have been obtained from the Card Issuer and/or
            Other Financial Institution (such circumstances being a
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">&quot;Chargeback&quot;).</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.2.&nbsp;</span>
          <span className="c4">
            User acknowledges and agrees that under all applicable rules,
            regulations and operating guidelines issued by Card Schemes,
            Financial
            <br />
            Institution, Central Bank of Nigeria and Alliance Pay relating to
            cards,
            <br />
            transactions, other payment methods and processing of data, User may
            be required to reimburse Alliance Pay for Chargebacks in
            circumstances where User has accepted payment in respect of the
            relevant transaction.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.3.&nbsp;</span>
          <span className="c4">
            All Chargebacks shall correspond to the whole or part of the
            settlement value of the original transaction or, at an amount
            equivalent
            <br />
            to the original settlement currency at the rate of exchange quoted
            for
            <br />
            Settlement purposes on the day the Chargeback is
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">processed.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.4.&nbsp;</span>
          <span className="c4">
            Where a Chargeback occurs, Alliance Pay shall immediately be
            entitled to debit User&rsquo;s position with its Settlement Bank
            and/or make a deduction from any remittance and/or invoice due to
            the User to
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">recover:</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            the full amount of the relevant Chargeback;
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">and</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            any other costs, expenses, liabilities or Fines which may be
            incurred as a result of or in connection with such Chargeback
            (&quot;ChargebackCosts&quot;).
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.5.&nbsp;</span>
          <span className="c4">
            A Chargeback represents an immediate liability from User to Alliance
            Pay. Where the full amount of any Chargeback and/or any
            <br />
            Chargeback Costs is not debited by Alliance Pay from the
            User&rsquo;s Merchant Bank Account or deducted from any remittance
            or invoiced, then Alliance Pay shall be entitled to otherwise
            recover from User by any means the full amount of such Chargeback
            and Chargeback Costs (or the balance thereof, as the case may
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">be).</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.6.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall not be obliged to investigate the validity of any
            Chargeback by any Card Issuer, Card Scheme or Other Financial
            Institution, whose decision shall be final and binding in respect of
            any
            <br />
            Chargeback.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.7.&nbsp;</span>
          <span className="c4">
            As Chargebacks may arise a considerable period after the date of the
            relevant transaction, the User acknowledges and agrees that,
            notwithstanding any termination of this relationship for any
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">reason,</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.8.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall remain entitled to recover Chargebacks and
            Chargeback Costs (and, where relevant, from any entity who has
            <br />
            provided Alliance Pay with a guarantee or security relating to
            User&rsquo;s
            <br />
            obligations under this relationship) in respect of all Chargebacks
            that occur in relation to transactions effected during the term
            thereof.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.9.&nbsp;</span>
          <span className="c4">
            Alliance Pay reserves the right to immediately pass on to and
            recover from the User any fines incurred and/or impose further
            charges on User and/or terminate the relationship forthwith if we
            consider that the total value of refunds and/or Chargebacks is
            unreasonable. Alliance Pay can
            <br />
            recover fines from User in the same way as Chargebacks and in any
            event they represent an immediate liability from User to
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">Alliance Pay.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">8.10.&nbsp;</span>
          <span className="c4">
            User agrees that it bears the responsibility to prove to Alliance
            Pay satisfaction (or that of the relevant Card Issuer or Other
            Financial Institution) that the debit of a customer&#39;s or
            cardholder&#39;s account was authorised by such customer or
            cardholder and that value was given to the customer.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">9. SET OFF</span>
        </p>
        <p className="c0">
          <span className="c5">9.1.&nbsp;</span>
          <span className="c4">Alliance Pay</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            is authorized to combine or consolidate all or any of the
            User&rsquo;s accounts with the Settlement Bank and set off or
            transfer any sum(s) standing to the credit of any one or more of
            such accounts in or towards the satisfaction of the User&rsquo;s
            settlement liabilities under the ALLIANCE PAY PLATFORM including any
            fees/fines imposed on Alliance Pay due to any breach of this T&amp;C
            by the
            <br />
            User.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">9.2.&nbsp;</span>
          <span className="c4">
            Alliance Pay is entitled to defer any settlement or any
            <br />
            other sum due to the User to the extent that Alliance Pay considers
            necessary or appropriate to protect their ability to recover the
            Fees and/or the sums or any other liability (actual or anticipated)
            of the User in connection with this Agreement.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">9.3.&nbsp;</span>
          <span className="c4">
            If Alliance Pay has reasonable suspicion that a transaction may be
            fraudulent or involve other illegal activity, Alliance Pay may
            suspend the processing of that transaction and any connected,
            transaction, or
            <br />
            withhold settlement until the satisfactory completion of any
            investigation. The User shall not be entitled to any interest or
            other compensation whatsoever in respect of suspension or delay in
            receiving the affected payment., Alliance Pay reserves the right to
            refund the money back to the card owners.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">9.4.&nbsp;</span>
          <span className="c4">
            The exercise by Alliance Pay of any of its rights under this clause
            shall be without prejudice to any other rights or remedies to which
            <br />
            Alliance Pay is otherwise entitled (by operation of law, contract,
            or
            <br />
            otherwise).
          </span>
          <span className="c1">&nbsp;&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">10.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">RESERVES&nbsp;</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">10.1.&nbsp;</span>
          <span className="c4">
            Where required by Alliance Pay, Alliance Pay shall upon
            communication to the User withhold 10% of 3months settlement value
            of the User or a fixed sum upon notice to the User (Reserve).
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">10.2.&nbsp;</span>
          <span className="c4">
            The Reserve shall be reviewed bi-annually and any required change to
            the Reserve shall be communicated to the User.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">10.3.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall be entitled to apply the Reserve to cover any
            Chargeback or Refund that may arise including any fees/fines imposed
            on Alliance Pay due to any breach of this T&amp;C by the User.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">10.4.&nbsp;</span>
          <span className="c4">
            If the Chargebacks and/or the refunds are higher than the Reserve,
            the User shall immediately make available the balance sum required
            to fulfill the Chargebacks or refunds liabilities.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">10.5.&nbsp;</span>
          <span className="c4">
            Alliance Pay may require that the Reserve security provided by the
            User be supplemented or replaced by any other form of security
            acceptable to Alliance Pay at any time.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3 c15">11.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3 c15">SECURITY/DEPOSIT</span>
        </p>
        <p className="c0">
          <span className="c13">11.1</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            Where required by Alliance Pay, Alliance Pay reserves the right to
            require that the User provides (or procures the provision of
            security in such form as to be agreed by the Parties to secure the
            performance of the Users actual, contingent or potential obligations
            under this T&amp;C or otherwise in connection with the services
            hereunder. Such security may take the form of a cash deposit, a
            rolling reserve,
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            Government Security
            <br />
            Instruments (Treasury bills and bonds), Bank guarantee or Insurance
            guarantee, any other guarantee or indemnity. Alliance Pay reserves
            the right to unilaterally call for an increase to the level of
            security held.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c13">11.2</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            Alliance Pay may require that any security provided be supplemented
            or replaced at any time.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c13">11.3</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            Upon termination of this T&amp;C, Alliance Pay may retain such
            amount from the security (if any) and settlement sums due to the
            User as
            <br />
            may be determined by Alliance Pay to cover Chargeback risk, Refund
            risk or any potential loss, damages, penalties, cost that may be
            incurred by User for a period of one hundred and eighty days (180)
            Business Days. In the event that such retained amount is not
            sufficient to cover all outstanding amounts of the User
            post-termination, the Merchant shall ensure that it pays the User
            all pending amounts within ten (10) Business
            <br />
            Days of receiving the demand notice and shall at all times keep
            Alliance Pay indemnified in this respect.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">12.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">RIGHT OF AUDIT</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">12.1.&nbsp;</span>
          <span className="c4">
            The User shall establish and maintain a reasonable accounting system
            that enables Alliance Pay readily identify the User&rsquo;s assets,
            expenses, costs of goods, and use of funds. Alliance Pay and its
            authorized representatives shall have the unrestricted right to
            audit, examine, and to make copies of, or extracts from all
            financial and related records (in whatever form they may be kept,
            whether written, electronic, or other) relating to or pertaining to
            this T&amp;C kept by or under the control of the User, including,
            but not limited to those kept by the User, its employees, agents,
            assigns, successors, and subcontractors. Such records shall include,
            but not be limited to, accounting records, deposit slips, bank
            statements, all paid vouchers including those for out-of-pocket
            expenses, other reimbursement supported by invoices, original
            estimates, written policies and procedures and other correspondence
            as well as KYC and other relevant documents.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">12.2.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall reserve the right to appoint at any time an
            authorized representative/auditor to conduct a systems and/or
            compliance audit of the User (upon reasonable notice) as it may
            <br />
            require in its absolute discretion notwithstanding that the User has
            confirmed to Alliance Pay that it has conducted an audit. The User
            undertakes to cooperate fully with and grant Alliance Pay&rsquo;s
            representative full access to its operations and relevant
            documentation for the purpose of conducting the audit.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">12.3.&nbsp;</span>
          <span className="c4">
            User undertakes to permit Alliance Pay to conduct such other audits
            of its operations and processes as may be applicable or relevant to
            the performance of the User&rsquo;s obligations under this T&amp;C.
            Such further audits shall be carried out under terms to be decided
            upon by Alliance Pay at its sole discretion.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">13.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">UNDERTAKINGS OF</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">ALLIANCE PAY</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.1.</span>
          <span className="c4">
            Alliance Pay shall provide the services with reasonable care and
            skill and in accordance with all applicable laws and
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">regulations.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.2.&nbsp;</span>
          <span className="c4">
            Alliance Pay warrants that it has the right and authority to grant
            to the User the licence set out in Clause 2, in accordance with the
            terms of this T&amp;C.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.3.&nbsp;</span>
          <span className="c4">
            Limitations on Warranties: To the fullest extent permitted by law,
            except as expressly set out in this T&amp;C, Alliance Pay excludes
            all warranties, conditions, terms, representations or undertakings
            whether express, implied, statutory or otherwise, including without
            limitation any condition or warranty of merchantability or fitness
            for a particular
            <br />
            purpose. Alliance Pay does not warrant that ALLIANCE PAY PLATFORM
            will meet User&#39;s requirements, that ALLIANCE PAY PLATFORM will
            be uninterrupted, secure or error free, or that all errors will be
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">corrected.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.4.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall not be liable to the User in event that the User
            suffers loss arising from a breach of the security and integrity of
            the User&rsquo;s Site, hardware or software related to this
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">Service.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.5.&nbsp;</span>
          <span className="c4">
            In no event shall Alliance Pay be liable to the User in excess of
            the transaction fees that has accrued to Alliance Pay from
            transactions emanating by virtue of this T&amp;C, in the month
            immediately preceding the date the first such claim arises.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.6.&nbsp;</span>
          <span className="c4">
            No liability shall be raised against Alliance Pay more than One (1)
            year after the accrual of the cause of such liability therefore, It
            is further agreed that the limitations on liability, expressed
            herein, shall inure to the benefit of and apply to all parents (both
            direct and indirect),
            <br />
            subsidiaries and affiliates of Alliance Pay.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.7.&nbsp;</span>
          <span className="c4">
            The limit of Liability applies irrespective of the number of
            claims.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.8.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall not be liable for any loss which occurs during a
            routine maintenance of its platform, of which it has given the User
            notice of.
          </span>
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.9.&nbsp;</span>
          <span className="c4">
            Alliance Pay will not be liable for the actions or inactions of any
            third party not acting on the instructions of Alliance Pay; neither
            will Alliance Pay be liable for the actions or inactions not
            directly traceable to it.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">13.10.&nbsp;</span>
          <span className="c4">
            Any third-party software application User uses on or with the
            ALLIANCE PAY PLATFORM is subject to the license agreed to between
            the User and the third party that provides such software. Alliance
            Pay does not own, control nor have any responsibility or liability
            for any third-party software application used on or with the
            ALLIANCE PAY PLATFORM.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">14.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">WARRANTIES</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">14.1.&nbsp;</span>
          <span className="c4">
            User warrants that it is duly registered, and has the full capacity,
            legal and corporate authorisation to accept this T&amp;C and
            discharge the obligations and responsibilities created herein.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">14.2.&nbsp;</span>
          <span className="c4">
            User further warrants that it has the required licenses and
            regulatory approvals to conduct its business and participate in this
            transaction and no element of the transaction constitutes a breach
            of any existing law, regulation, patent, copyright, or other
            intellectual property in its country or countries of domicile and
            operation.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">14.3.&nbsp;</span>
          <span className="c4">
            User warrants that it has adequate controls, safeguards, information
            technology security and effective internal controls for all its
            operations.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">14.4.&nbsp;</span>
          <span className="c4">
            User warrants to perform the necessary KYC (Know your customer)
            &amp; due diligence on all its customers.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">14.5.&nbsp;</span>
          <span className="c4">
            User will keep Alliance Pay indemnified against all actions, claims,
            proceedings and all legal cost or other expenses arising out of any
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            breach of the above warranties or out of any claim by a third party
            based on any facts which if substantiated would constitute such a
            breach or a breach of other relevant legal or contractual duty.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">15.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">DATA REQUEST AND INTEGRITY</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">15.1.&nbsp;</span>
          <span className="c4">
            In order to enable us to comply with applicable laws, including but
            not limited to anti-terrorism, financial services, anti-tax evasion
            and anti-money laundering laws and regulations imposing Customer Due
            Diligence (&ldquo;CDD&rdquo;) requirements, as well as with the card
            scheme requirements, the User must, before accepting this T&amp;C,
            and thereafter on our first request, provide information: about
            itself, and in particular about its financial status, solvency and
            liquidity, its activities, its payment acquiring and processing
            arrangements, its shareholders, its ultimate beneficial
            shareholders, the User&rsquo;s Products/Services, its registered
            office address, as well as any and all regulatory licences and
            registrations required to sell Merchant Products/Services (herein
            defined as &ldquo;the Merchant Underwriting Data&rdquo;).&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">15.2.&nbsp;</span>
          <span className="c4">
            The User warrants unconditionally that all Merchant Underwriting
            Data it provides to Alliance Pay is correct and up to date and
            undertakes to provide Alliance Pay with at least five (5) Business
            Days prior written notice of any material change of the Merchant
            Underwriting Data, including in particular (but not limited to) any
            change of its directors, shareholders and/or ultimate beneficial
            owners.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">15.3.&nbsp;</span>
          <span className="c4">
            In addition to data specified in clause 15.1 above, Alliance Pay may
            also from time to time request the User&nbsp;provide additional
            financial and other information such as relating to: (i) the current
            actual or expected delivery dates for processed Transactions; (ii)
            estimates for the average time between Transaction authentication
            and the related delivery date; (iii) User&rsquo;s ability to provide
            its Products/Services, and/or (iv) User&rsquo;s financial status,
            solvency and liquidity. The Merchant shall provide such requested
            information within five (5) Business Days of our written
            request.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">15.4.&nbsp;</span>
          <span className="c4">
            If the User fails to provide the data requested in accordance with
            the provisions of this clause, Alliance Pay reserves the right to
            suspend access to the ALLIANCE PAY for Business Platform until such
            data is provided.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">15.5.&nbsp;</span>
          <span className="c4">
            The User agrees that Alliance Pay may run further checks on the User
            &rsquo;s identity, creditworthiness and background by contacting and
            consulting relevant registries and governmental authorities or
            <br />
            any other relevant sources.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">15.6.&nbsp;</span>
          <span className="c4">
            The User hereby authorizes Alliance Pay to submit Merchant
            Underwriting Data, or any other relevant information received from
            the User, to the relevant Card Scheme or Third-Party Payment
            Processor to obtain a permission for providing access to their
            Payment Methods for the User, or for any ongoing monitoring related
            purpose.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">16.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">DISPUTES</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">16.1.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall not be involved in any dispute that may arise
            between the User and its customer.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">16.2.&nbsp;</span>
          <span className="c4">
            If a dispute arises between Alliance Pay and the User in
            <br />
            connection with the interpretation, implementation or operation of
            this T&amp;C or its subject matter or the validity of any document
            furnished by either Alliance Pay or the User under this T&amp;C
            which cannot be resolved amicably by them within 10 days of notice
            of the dispute by either of them, Alliance Pay and the User and
            their legal representatives will promptly meet to consider whether
            there is a possibility of resolution by mediation or conciliation
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">16.3.&nbsp;</span>
          <span className="c4">
            If Alliance Pay and User do not agree to refer a dispute to
            mediation or conciliation under the Lagos State Multidoor Court
            House, the matter shall refer the dispute to a court of competent
            jurisdiction.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">16.4.&nbsp;</span>
          <span className="c4">The provisions of this clause:</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">a.</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            constitute an irrevocable consent by Alliance Pay and User to any
            proceedings in terms hereof and no party shall be entitled to
            <br />
            withdraw there from or claim at any such proceedings that it is not
            bound by those provisions; and
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">b.</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            are severable from the rest of this T&amp;C and shall remain in
            effect despite the termination of or invalidity of this T&amp;C for
            any reason.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">16.5.&nbsp;</span>
          <span className="c4">
            This clause shall not preclude either Alliance Pay or
            <br />
            User from obtaining interim relief on an urgent basis from a court
            of competent jurisdiction pending the decision of the mediator or
            conciliator.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">16.6.&nbsp;</span>
          <span className="c4">
            The mediator or conciliator may, in any dispute in
            <br />
            which any matter of a technical or financial nature is relevant,
            appoint an
            <br />
            assessor having the requisite experience to assist the mediator or
            conciliator in the mediation process.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">17.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">SERVICE TERMINATION</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">17.1.</span>
          <span className="c4">
            This T&amp;C shall commence on the date of acceptance by the User
            and remain effective until terminated in accordance with provisions
            contained herein.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">17.2.&nbsp;</span>
          <span className="c4">
            Either Alliance Pay or the User may elect to terminate
            <br />
            this T&amp;C by giving three (3) month&rsquo;s prior notice in
            writing to the other
            <br />
            of its intention to do so.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">17.3.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall be entitled to immediately suspend the provision
            of the service or to terminate the service and by effect this
            T&amp;C at any time with immediate effect by notice to User if:
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            User is in breach of any of the provisions herein;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            User fails to pay any amount due under this
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">T&amp;C;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">c.&nbsp;</span>
          <span className="c4">
            Alliance Pay considers (in its absolute discretion) that the total
            value of refunds and/or chargebacks is
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">unreasonable;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">d.&nbsp;</span>
          <span className="c4">
            User is in breach of any applicable trading limit or floor
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">limit;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">e.&nbsp;</span>
          <span className="c4">
            User presents a transaction in a situation where User does not give
            to the relevant customer or
            <br />
            cardholder the goods, services or other facilities referred to which
            they could reasonably expect to
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">receive;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">f.&nbsp;</span>
          <span className="c4">
            User becomes insolvent or any step is taken for User liquidation,
            winding-up, bankruptcy, receivership, administration or dissolution
            (or anything analogous to the foregoing occurs in any
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">jurisdiction);</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">g.&nbsp;</span>
          <span className="c4">
            User makes or proposes any arrangement with creditors
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">generally;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">h.&nbsp;</span>
          <span className="c4">
            anything happens to User or a matter is brought to the attention of
            Alliance Pay which in its absolute discretion, it considers may
            affect User&rsquo;s ability or willingness to comply with all or any
            of User&rsquo;s
            <br />
            obligation or liabilities
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">herein;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">i.&nbsp;</span>
          <span className="c4">
            any other change in User circumstances (including a deterioration in
            or change to User&rsquo;s financial position) or in the nature of
            User&rsquo;s business or in the goods and/or services supplied by
            User to customers or cardholders occurs which Alliance Pay in its
            absolute discretion considers material to the continuance of the
            services or any facilities made available toUser;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">j.&nbsp;</span>
          <span className="c4">User ceases to carry on</span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            business or changes its line of business without notification to
            Alliance Pay;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">k.&nbsp;</span>
          <span className="c4">
            Alliance Pay in its absolute discretion, determines that the
            relationship with User&rsquo;s business represents increased risk of
            loss or
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">liability;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">l.&nbsp;</span>
          <span className="c4">
            anything happens to User or comes to the attention of Alliance Pay
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            in relation to User or arising from or incidental to User&rsquo;s
            business or the
            <br />
            conduct of User&rsquo;s business (including trading practices and
            individual
            <br />
            activities) or User engages in any business trading practices or
            individual
            <br />
            activity which in Alliance Pay&rsquo;s absolute discretion is
            considered disreputable or capable of damaging Alliance Pay&rsquo;s
            reputation or that of any of the card scheme
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            or other financial Institutions, detrimental
            <br />
            to Alliance Pay&rsquo;s business or that of any of the card scheme
            or other financial institution or which may or does give rise to
            fraud or any other criminal activity or suspicion of fraud or any
            other criminal
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">activity;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">m.&nbsp;</span>
          <span className="c4">
            any fines or any other claims are brought against Alliance Pay by
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            any card scheme, financial institution or any other third party
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            arising from any aspect of the parties&rsquo; relationship
            (including in connection with any security breach, compromise or
            theft of Data held by User or on behalf of User irrespective of
            whether such security breach, compromise or theft of Data was within
            or outside User
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">control);</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">n.&nbsp;</span>
          <span className="c4">
            User undertakes trading practices which Alliance Pay has not
            consented
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">to;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">o.&nbsp;</span>
          <span className="c4">
            Alliance Pay or any affiliate becomes entitled to terminate any
            T&amp;C with or enforce any security from User or User&rsquo;s
            affiliate;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">p.&nbsp;</span>
          <span className="c4">
            any card scheme, financial institution, acquirer or regulator
            introduces additional terms and conditions or amends the terms and
            conditions relating to this service;&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">q.&nbsp;</span>
          <span className="c4">
            User is involved in any activity that may in Alliance Pay&rsquo;s
            opinion create harm or loss to the goodwill of a card scheme; or
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">r.&nbsp;</span>
          <span className="c4">
            Alliance Pay is required or requested to do so by any card scheme,
            financial Institution, regulator or government agency
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">18.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">CONSEQUENCES OF</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">TERMINATION</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">18.1.</span>
          <span className="c4">
            Upon termination of this T&amp;C and or service, all rights and
            obligations of either party shall cease to have effect immediately,
            save that:
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            the clauses of conditions which expressly or by implication have
            effect after termination will continue to be enforceable
            notwithstanding such termination;
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">and</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            termination shall not affect accrued rights and obligations of
            either Alliance Pay or User under the T&amp;C as at the date of
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">termination.</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">18.2.&nbsp;</span>
          <span className="c4">
            Upon or at any time after termination, User shall
            <br />
            immediately pay all amounts owed under the service and, for the
            avoidance of doubt, Alliance Pay shall remain entitled to withhold
            sums, set- off any sums and recover any Chargebacks and Chargeback
            Costs pursuant to the relevant clauses
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">herein.</span>
          <span className="c1">&nbsp;&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">19.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">GOVERNING LAW</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            This T&amp;C shall be governed by the laws of the Federal Republic
            of Nigeria.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">20.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">WAIVER</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            The failure by either Party to enforce any of the
            <br />
            provisions of this T&amp;C shall not constitute a waiver of the same
            or affect
            <br />
            that Party&#39;s rights thereafter to enforce the same.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">21.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">ASSIGNMENT</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">21.1.&nbsp;</span>
          <span className="c4">
            Neither Party shall assign any of its obligations under this T&amp;C
            without the prior written consent of the other Party, which shall
            not be unreasonably withheld.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">21.2.&nbsp;</span>
          <span className="c4">
            Regardless of any provision of this Agreement,
            <br />
            Alliance Pay shall be entitled to assign all or any part of this
            relationship to a card scheme upon written notice to the User.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">22.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">CONFIDENTIALITY</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">22.1.&nbsp;</span>
          <span className="c4">
            The User undertakes to keep confidential all information [written or
            oral] concerning the business and affairs of Alliance Pay that it
            shall have obtained or received as a result of the discussions
            leading up to or the acceptance of this T&amp;C save that which is
            [a] already in its possession other than as a result of a breach of
            this clause; or [b] in the public domain other than as a result of a
            breach of this clause. And User undertakes to take all such steps as
            shall from time to time be necessary to ensure compliance with the
            provisions of this clause by its employees, agents and
            subcontractors. The confidentiality obligations shall survive the
            termination of this T&amp;C.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">22.2.&nbsp;</span>
          <span className="c4">
            Alliance Pay shall be entitled to disclose any transaction data or
            any other information relating to the User to a card scheme.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">23.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">INTELLECTUAL PROPERTY</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            Nothing set forth in this T&amp;C shall constitute a transfer or
            assignment by Alliance Pay of any Intellectual Property Rights owned
            or otherwise controlled by it.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">24.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">FORCE</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">MAJEURE</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c4">
            If the compliance with this T&amp;C or any obligation under it is
            prevented, restricted or interfered with by reason of circumstances
            beyond the reasonable control of the party obliged to perform it,
            the party so affected shall be
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c4">
            excused from performance to the extent of the prevention,
            restriction or interference, but the party so affected shall use its
            best endeavours to avoid or remove the causes of non-performance and
            shall continue performance under this T&amp;C with utmost dispatch
            whenever such causes are removed or diminished.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">25.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">PRIVACY STATEMENT</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">25.1.</span>
          <span className="c4">
            User acknowledges that by use of the ALLIANCE PAY PLATFORM, Alliance
            Pay shall be privy to and store some of its personal information
            (full name, mobile phone number and email address).
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">25.2.</span>
          <span className="c4">
            Alliance Pay may use User&rsquo;s personal information for:
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">
            providing the service, processing transactions and sending the User
            related information;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">
            providing, maintaining and improving the services;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">c.&nbsp;</span>
          <span className="c4">
            sending support and administrative messages to User;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">d.&nbsp;</span>
          <span className="c4">responding to User enquiries and requests;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">e.&nbsp;</span>
          <span className="c4">providing customer service;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">f.&nbsp;</span>
          <span className="c4">
            updating User on products, services, promotions, rewards, and events
            offered by Alliance Pay and third parties; and
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">g.&nbsp;</span>
          <span className="c4">
            a better understanding of User needs by combining it with
            information collected from others with the objective of improving on
            service delivery.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">25.3.</span>
          <span className="c4">
            Alliance Pay may disclose any information it collects about User to
            third parties as set forth
            <br />
            below:
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">a.&nbsp;</span>
          <span className="c4">to regulatory bodies;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">b.&nbsp;</span>
          <span className="c4">to financial institutions;</span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">c.&nbsp;</span>
          <span className="c4">
            to companies, such as email service providers that perform marketing
            services on Alliance Pay&rsquo;s behalf;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">d.&nbsp;</span>
          <span className="c4">
            to third parties to enable Alliance Pay provide the ALLIANCE PAY
            <br />
            BUSINESS PLATFORM; and
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">e.&nbsp;</span>
          <span className="c4">
            if required to be disclosed under applicable law, or stock exchange
            regulation or by a governmental order, decree, regulation or rule or
            by a court order.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">25.4.</span>
          <span className="c4">
            User consents to the processing and transfer of its information
            during and after the use of the ALLIANCE PAY PLATFORM.&nbsp;
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c3">26.</span>
          <span className="c2">&nbsp;</span>
          <span className="c3">NOTICES</span>
          <span className="c6 c2">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">26.1.</span>
          <span className="c4">
            Any notice required hereunder shall be in writing and sent to the
            User via the electronic mail address provided to Alliance Pay during
            registration of use of the ALLIANCE PAY PLATFORM. Any electronic
            Communications will be considered to be received by User within 24
            hours of being sent.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">26.2.</span>
          <span className="c4">
            All communications to Alliance Pay must be sent by electronic mail
            to:&nbsp;
          </span>
          <span className="c4 c7">corporatesupport@alliancepay.io</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c5">26.3.</span>
          <span className="c4">
            User is to keep primary email address up to date so that Alliance
            Pay can communicate with it electronically. User understands and
            agree that if Alliance Pay sends an electronic communication, but
            User does not receive it due to the primary email address on file
            being incorrect, out of date, blocked, or otherwise unable to
            receive electronic Communications, Alliance Pay will be deemed to
            have provided the communication to the User effectively.
          </span>
        </p>
        <p className="c0">
          <span className="c5">&nbsp;</span>
          <span className="c14 c15">
            I hereby authorize Alliance Pay Limited (Alliance Pay) to
          </span>
          <span className="c14">:</span>
          <span className="c1">&nbsp;&nbsp;</span>
        </p>
        <p className="c0 c12">
          <span className="c14">
            withhold settlement of all sums due to me, until I complete the Know
            Your Customer (KYC) exercise
          </span>
          <span className="c14 c16">,&nbsp;</span>
          <span className="c14">
            conducted by Alliance Pay, and submit all documents/information
            requested by Alliance Pay; and
          </span>
          <span className="c1">&nbsp;&nbsp;</span>
          <span className="c14">
            refund all sums paid to me via the ALLIANCE PAY For Business
            Platform, to the respective cardholders
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c14">
            (regardless of whether the cardholder has been given value), if I do
            not complete the KYC exercise
          </span>
          <span className="c5">&nbsp;</span>
          <span className="c14">within 60 days from the date of go live.</span>
          <span className="c1">&nbsp;&nbsp;&nbsp;</span>
        </p>
        <p className="c0">
          <span className="c1">&nbsp;&nbsp;&nbsp;</span>
        </p>
        <p className="c11">
          <span className="c6 c17"></span>
        </p>
      </Stack>
      {/* ------––––––––––––––––– */}
      {/* ––––––– /content ------- */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: "60px",
          padding: "26px 0",
        }}
      >
        <LoadingButton
          onClick={() =>
            handleSubmit({
              accepted: true,
            })
          }
          loading={loading}
          variant="contained"
          fullWidth
        >
          Accept
        </LoadingButton>
        <Button
          onClick={close}
          variant="outlined"
          fullWidth
          sx={{ mt: "25px" }}
        >
          Decline
        </Button>
      </Box>
    </Box>
  );
}
