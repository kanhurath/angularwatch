# ShowCase

npm install -g @angular/cli  
ng new show-case 
cd show-case

ng serve  

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma].

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor].

## New Component
ng generate component name

## New Service
ng generate service name

## app routing module
ng g module app-routing --flat --module=app

## Bootstrap Add
npm install --save bootstrap

## Jquery Add
npm install jquery --save

## mbd install
ng add angular-bootstrap-md
npm install @angular/cdk --save
npm install angular-bootstrap-md --save

## material install
ng add @angular/material

## ng2-pdf-viewer install
npm i ng2-pdf-viewer
npm i ng2-pdf-viewer @Version

## ngx-datatable install
npm i ngx-datatable

## Creat Dist
ng build --prod

npm install http-server -g

http-server dist/show-case

http://localhost:8080

##(npm i cors --save)

## Adding functionality in this code(Date:)
1.Created global upload service(services/global-upload.service.ts).
2.Add CSV Format (FS10) Upload and Download functionality
    i.CSV Format ABM Order Download(FS10)-(path:abmOrderDownload)
    ii.CSV Format ABM Order Upload(FS10)-(path:abmOrderUpload)
    iii.CSV Format RBM Order Download(FS10)-(path:rbmOrderDownload)
    iv.CSV Format RBM Order Upload(FS10)-(path:rbmOrderUpload)
3.if PDF file aren't available on the folder show message(product-detail/variant number). 
4. Upload Button buffering.
5. While giving STAR rating at SKU level is it possible to show what is the average star rating so far given by other users.
6. No. of club dealers and star club dealers for the RS.
7.Created upload page Dynamic order download .xlsx format (services/global-upload.service.ts).

*****************************************************************
  Quality Server(89)---- Live production server(url) Changeing
*****************************************************************

1.environment(No-2) pages.
2.global-upload.service.ts(No-1)

Pending
**************
1.All user manual download pdf store in pord-assets/pdf