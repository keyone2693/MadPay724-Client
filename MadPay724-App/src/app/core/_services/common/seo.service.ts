import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }

  generateTags(config:any) {
    config = {
      title: 'مادپی 724 | درگاه واسط بانکی',
      description: 'مادپی 724 ارائه دهنده درگاه پرداخت,کیف‌پول,کیف پول آنلاین,درگاه ussd,پرداخت درون برنامه ای,درگاه مستقیم,پرداخت موبایلی,درگاه اختصاصی,درگاه واسط,درگاه پرداخت بانکی می باشد.',
      keywords: 'کیف پول,درگاه مستقیم,پرداخت موبایلی,درگاه پرداخت درون برنامه ای,درگاه پرداخت بانکی,درگاه موبایلی,کیف پول آنلاین,ussd اختصاصی,مادپی 724,درگاه واسط,درگاه پرداخت, پرداخت‌یار, پرداخت یار',
      image: '../../../../assets/wp-content/themes/munza/assets/images/logo/white.png',
      url: '',
      ...config
    }

    this.meta.updateTag({ name: 'keywords', content: config.keywords });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@madpay724_ir' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'MadPay724' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `https://madpay724.ir/${config.url}` });
    
  }

  updateTitle(title: string) {
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ property: 'og:title', content: title });
  }

  

}
