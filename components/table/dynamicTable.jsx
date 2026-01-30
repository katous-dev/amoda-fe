import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";

const DynamicTable = ({ columns, data }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }} style={{borderRadius:2}}>
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <tr>
            {columns.map((col) => (
              <TableCell 
                key={col.key}
                align={col.align || "left"}
                sx={{ fontWeight: "bold" }}
              >
                {col.label}
              </TableCell>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <tr key={row.id || index} >
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || "left"}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </TableCell>
              ))}
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
