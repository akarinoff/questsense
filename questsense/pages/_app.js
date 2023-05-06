import { Provider } from 'react-redux'
import { useStore } from '../my_redux/store'
// import TemplateBackend from '../app/TemplateBackend'
// import TemplateBank from '../app/TemplateBank'
import TemplateFrontendnew from '../app/TemplateFrontendnew'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  let template = (typeof pageProps.template=='undefined')?"bank":pageProps.template;

  return (
    <Provider store={store}>
      <>
        <TemplateFrontendnew template={template}>
          <Component {...pageProps} />
        </TemplateFrontendnew>
        {/* {(template == 'frontend'||template == 'frontend_member')&&
          <TemplateFrontendnew template={template}>
            <Component {...pageProps} />
          </TemplateFrontendnew>
        } */}
        {/* {template.includes('backend') &&
          <TemplateBackend>
            <Component {...pageProps} />
          </TemplateBackend>
        }
        {template == 'frontendnew' &&
          <TemplateFrontendnew>
            <Component {...pageProps} />
          </TemplateFrontendnew>
        }
        {template == 'bank' &&
          <TemplateBank>
            <Component {...pageProps} />
          </TemplateBank>
        } */}
      </>
    </Provider>
  )
}
