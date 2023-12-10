# T-rak
> Tier-list web application for ranking purpose !

## Getting Started

This project is create by using [pnpm](https://pnpm.io/) with [next.js](https://nextjs.org/docs/getting-started/installation) framework.

First, install dependencies:
```bash
pnpm install
```

Second, run the development server:

```bash
pnpm dev --turbo
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## API documents

<table>
<thead>
  <tr>
    <th>route</th>
    <th>method</th>
    <th>request</th>
    <th>response (success)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>/api/auth/signin</td>
    <td>POST</td>
    <td>form-data<br>{ <br>&nbsp;&nbsp;email: string,<br>&nbsp;&nbsp;password: string<br>}</td>
    <td>{ status: 301 }<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⇩<br>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/auth/signup</td>
    <td>POST</td>
    <td>form-data<br>{<br>  &nbsp;&nbsp;email: string, <br>  &nbsp;&nbsp;password: string, <br>  &nbsp;&nbsp;picture: FILE, <br>  &nbsp;&nbsp;name: string<br>}</td>
    <td>{ status: 301 }<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⇩<br>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/auth/signout</td>
    <td>POST</td>
    <td>-</td>
    <td>{ status: 301 }<br>⇩<br>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/user (get personal info)</td>
    <td>GET</td>
    <td>-</td>
    <td>body {   <br>  &nbsp;&nbsp;email: string,   <br>  &nbsp;&nbsp;picture: string (path),   <br>  &nbsp;&nbsp;name: string <br>}<br><br>status {<br> &nbsp;&nbsp;status: 200<br>}</td>
  </tr>
  <tr>
    <td>/api/user (update)</td>
    <td>POST</td>
    <td>form-data<br>{<br>&nbsp;&nbsp;picture: string,<br>&nbsp;&nbsp;name: string <br>}</td>
    <td>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/tierlist/create</td>
    <td>POST</td>
    <td>form-data<br>{<br>&nbsp;&nbsp;categoryName: string,<br>&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;descrirption: string,<br>&nbsp;&nbsp;coverPhoto: FILE,<br>&nbsp;&nbsp;rowCount: number<br>}</td>
    <td>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/tierlist/update</td>
    <td>POST</td>
    <td>form-data<br>{ <br>&nbsp;&nbsp;tierlistId: string,<br>&nbsp;&nbsp;categoryName?: string,<br>&nbsp;&nbsp;name?: string,<br>&nbsp;&nbsp;descrirption?: string,<br>&nbsp;&nbsp;coverPhoto?: FILE<br>}</td>
    <td>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/tierlist (home)</td>
    <td>GET</td>
    <td>-</td>
    <td>[<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;tierlistId: string,<br>    &nbsp;&nbsp;&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;description: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;coverPhotoUrl: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;category: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;categoryName: string<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;...<br>]</td>
  </tr>
  <tr>
    <td>/api/tierlist?id=tierlistId</td>
    <td>DELETE</td>
    <td>-</td>
    <td>{ status: 200 }<br></td>
  </tr>
  <tr>
    <td>/api/tierlist/show?id=tierlistId</td>
    <td>GET</td>
    <td>-</td>
    <td>{<br>&nbsp;&nbsp;tierlistId: string, <br>&nbsp;&nbsp;categoryId: string,<br>&nbsp;&nbsp;userId: string,<br>&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;coverPhotoUrl: string,<br>&nbsp;&nbsp;descrirption: string,<br>&nbsp;&nbsp;category: {<br>&nbsp;&nbsp;&nbsp;&nbsp;categoryName: string<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;rows: Array({ <br>&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;tierlistId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;label: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;color: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;order: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;elements: Array({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elementId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pictureUrl: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: string<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;})<br>}</td>
  </tr>
  <tr>
    <td>/api/tierlist/row</td>
    <td>POST</td>
    <td>form-data<br>{<br>&nbsp;&nbsp;picture[row][element]: FILE,<br>&nbsp;&nbsp;data: [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elements: Array({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: string<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: string<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;]<br>}</td>
    <td>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/tierlist/row?id=rowId</td>
    <td>GET</td>
    <td></td>
    <td>[<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;tierlistId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;label: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;color: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;order: 0,<br>&nbsp;&nbsp;&nbsp;&nbsp;elements: Array({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elementId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pictureUrl: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: string<br>&nbsp;&nbsp;&nbsp;&nbsp;)}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;tierlistId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;label: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;color: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;order: -1,<br>&nbsp;&nbsp;&nbsp;&nbsp;elements: Array({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elementId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rowId: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pictureUrl: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: string<br>&nbsp;&nbsp;&nbsp;&nbsp;)}<br>&nbsp;&nbsp;}<br>]</td>
  </tr>
  <tr>
    <td>/api/tierlist/row?id=rowId</td>
    <td>DELETE</td>
    <td>-</td>
    <td>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/tierlist/modify?id=tierlistId</td>
    <td>POST</td>
    <td>form-data<br>{<br>&nbsp;&nbsp;picture[row][element]: FILE,<br>&nbsp;&nbsp;data: [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elements: Array({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: string<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: string<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;]<br>}</td>
    <td>{ status: 200 }</td>
  </tr>
  <tr>
    <td>/api/category</td>
    <td>GET</td>
    <td>-</td>
    <td>[<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;id: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;name: string<br>&nbsp;&nbsp;}<br>]</td>
  </tr>
  <tr>
    <td>/api/category</td>
    <td>POST</td>
    <td>form-data<br>{<br>&nbsp;&nbsp;categoryName: string<br>}</td>
    <td>{ status: 201 }</td>
  </tr>
</tbody>
</table>
(generate table from : https://www.tablesgenerator.com/html_tables)

