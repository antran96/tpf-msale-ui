# Fico mSale
## Version: 2.0.0
UAT COMMON
## Installation
**1. Kiểm tra và cài đặt môi trường cần thiết:**
- Download, Install: **Nodejs** (global)
- Install module **vue-cli-service** global
```
npm i vue-cli-service -g --s
```
**2. Clone Project và cài đặt:**
```
git clone https://fico-portaltest.tpb.vn/gitlab/tpf-service/tpf-msale-ui.git
cd tpf-msale-ui
git pull origin { Branch_name | all }
npm i --s
```
## Development
```
npm run dev
```

## Build
- Xem ở {scripts} trong file *package.json*
```
npm run build:uat
npm run build:pro
```

## InHome
```
document.cookie = "token=8d037583-8724-457c-8f25-3f1e0009cdc2";
```
```
localStorage.setItem('INFOR_USER', JSON.stringify({"active":true,"exp":1650241012,"user_name":"longdv1","authorities":["role_root"],"client_id":"tpf-service-root","scope":["tpf-service-root"],"departments":["document_check","thuc","loan_booking","IT","it","sale_team","long","data_entry","repayment"],"projects":["dataentry","momo","CMS","nostro"],"optional":{"roles":["admin_user","account_getall","account_create","account_master","account_edit","account_delete","client_view","client_create","client_edit","client_delete","de_lead_view","de_lead_create","de_lead_return","de_lead_admin","de_report_view","momo_de_view","momo_dc_view","momo_lb_view","momo_as_view","momo_acca_view","repayment_view","autoassign_view","checkapp_view","smart_net_view","de_auto_routing_view","de_auto_routing_api_view","auto_allocation_supervisor_view","auto_allocation_leader_view","auto_allocation_user_view","auto_allocation_configuration_view","auto_allocation_create","auto_allocation_delete","auto_allocation_edit","eform_supervisor_view","eform_leader_view","eform_qa_leader_view","eform_qa_user_view","eform_user_view","eform_support_view","eform_create","eform_edit","eform_delete","cms_settings_view","cms_sale_view","cms_sale_update","cms_sale_admin","cms_cp_update","cms_cp_view","cms_cp_admin"],"avatar":"happy","settings":{"cms/Sale":["id_card_number","disbursal_date","customer_name","application_number","schema_name","dsa_code","branch_name","current_status","team_lead","supervisor","manager","update_user"]},"status":"await"}}))
```
