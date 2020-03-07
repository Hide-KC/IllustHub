import Vue from 'vue'
import VueRouter from 'vue-router'
import { ROOT, GANTT_PAGE, PREVIEW_PAGE } from "@/router/pathStrings"
import TopPage from '@/components/pages/TopPage.vue'
import GanttPage from '@/components/pages/GanttPage.vue'
import PreviewPage from '@/components/pages/PreviewPage.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: ROOT,
      name: 'TopPage',
      component: TopPage
    },
    {
      path: `${GANTT_PAGE}/:id`,
      name: 'GanttPage',
      component: GanttPage
    },
    {
      path: `${PREVIEW_PAGE}/:id`,
      name: 'PreviewPage',
      component: PreviewPage
    }
  ]
})

export default router