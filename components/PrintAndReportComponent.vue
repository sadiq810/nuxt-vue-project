<template>
 <div>
   <div class="dropdown inline-block">
     <a href="javascript: void(0)" class="thumb thumb-xs thumb-round dropdown-toggle" data-toggle="dropdown"  id="reportDropdown" aria-haspopup="true" aria-expanded="false">
       <i class="ico-more-alt"></i>
     </a>
     <div class="dropdown-menu text-right">
       <ul>
         <li>
           <PrintComponent :elementId="elementId"/>
         </li>
         <li>
           <a class="dropdown-item text_red" href="javascript: void(0)" @click.stop="triggerModal">
             <span class="thumb thumb-xs thumb-round thumb-dark bg-red ml-2">
               <i class="ico-flag"></i>
             </span>
             {{ $t('report_error') }}
           </a>
         </li>
       </ul>
     </div>
   </div>
   <SendNoteComponent />
 </div>
</template>

<script>
import SendNoteComponent from "@/components/modals/SendNoteComponent";
export default {
name: "PrintAndReportComponent",
  components: {SendNoteComponent},
  props: {elementId: String},
  methods: {
    triggerModal() {
      $('#sendNoteModal').modal('show');
    },
  }
}
</script>
