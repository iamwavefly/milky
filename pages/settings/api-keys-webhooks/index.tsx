import PayoutTable from "@/components/settings/payouts/payoutTable";
import useFetch from "@/hooks/useFetch";
import Dashboard from "@/layouts/dashboard";
import baseUrl from "@/middleware/baseUrl";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuditTable from "@/components/settings/audit/auditTable";
import truncate from "@/helper/truncate";
import clipboard from "@/helper/clipboard";
import OnlyHeader from "@/components/cards/onlyHeader";
import CopyIcon from "@/public/icons/copy.svg";

interface Props {
  id: number;
  name: string;
  user_count: number;
}

const Index = () => {
  const [keys, setKeys] = useState<any>({});
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/subsidiary/get-keys`,
    "get"
  );
  // webhook
  const webhook = useFetch(
    `${baseUrl}/static/account/default/webhook/view`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    webhook?.handleSubmit();
  }, []);

  useEffect(() => {
    setKeys(data?.api_keys);
  }, [data]);

  return (
    <Dashboard title="API keys & Webhooks">
      <Stack spacing="24px">
        <Stack direction="row" alignItems="center" gap="16px">
          {/* Webhook URL */}
          <OnlyHeader
            alignHeader="left"
            header="Webhook URLs"
            flex={1}
            minHeight="146px"
          >
            <Box my="auto">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="14px"
              >
                <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                  {truncate(webhook?.data?.data?.callback_url ?? "N/A", 30)}
                </Typography>
                <Button
                  variant="text"
                  sx={{ fontSize: "12px", gap: "4px" }}
                  onClick={() => clipboard(webhook?.data?.data?.callback_url)}
                >
                  Copy <CopyIcon />
                </Button>
              </Stack>
            </Box>
          </OnlyHeader>
          {/*  Encryption Key end */}
          <OnlyHeader
            alignHeader="left"
            header="Public Key"
            flex={1}
            minHeight="146px"
          >
            <Box my="auto">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="14px"
              >
                <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                  {truncate(keys?.public_key ?? "N/A", 30)}
                </Typography>
                <Button
                  variant="text"
                  sx={{ fontSize: "12px", gap: "4px" }}
                  onClick={() => clipboard(keys?.public_key)}
                >
                  Copy <CopyIcon />
                </Button>
              </Stack>
            </Box>
          </OnlyHeader>
        </Stack>
        <Stack direction="row" alignItems="center" gap="16px">
          {/* Webhook URL */}
          <OnlyHeader
            alignHeader="left"
            header="Secret Key"
            flex={1}
            minHeight="146px"
          >
            <Box my="auto">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="14px"
              >
                <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                  {truncate(keys?.secret_key ?? "N/A", 30)}
                </Typography>
                <Button
                  variant="text"
                  sx={{ fontSize: "12px", gap: "4px" }}
                  onClick={() => clipboard(keys?.secret_key)}
                >
                  Copy <CopyIcon />
                </Button>
              </Stack>
            </Box>
          </OnlyHeader>
          {/*  Encryption Key end */}
          <OnlyHeader
            alignHeader="left"
            header="Encryption Key"
            flex={1}
            minHeight="146px"
          >
            <Box my="auto">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="14px"
              >
                <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                  {truncate(keys?.encryption_key ?? "N/A", 30)}
                </Typography>
                <Button
                  variant="text"
                  sx={{ fontSize: "12px", gap: "4px" }}
                  onClick={() => clipboard(keys?.encryption_key)}
                >
                  Copy <CopyIcon />
                </Button>
              </Stack>
            </Box>
          </OnlyHeader>
        </Stack>
      </Stack>
    </Dashboard>
  );
};

export default Index;
