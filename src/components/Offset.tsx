import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";

export default function Offset({ multiplier }: { multiplier: number }) {
  const theme = useTheme();
  const minHeight = useMemo(() => theme.mixins.toolbar.minHeight, [theme]);

  return <Box sx={{ minHeight: Number(minHeight === undefined ? 56 : minHeight) * multiplier }}></Box>;
}
