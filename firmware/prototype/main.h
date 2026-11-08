  
/* Define to prevent recursive inclusion -------------------------------------*/
#ifndef __MAIN_H
#define __MAIN_H

/* Includes ------------------------------------------------------------------*/

#include <stdio.h>
#include "stm32f4xx.h"
#include "tm_stm32f4_ili9341_ltdc.h"
#include "tm_stm32f4_fonts.h"
#include "tm_stm32f4_l3gd20.h"
#include "tm_stm32f4_delay.h"
#include "tm_stm32f4_mpu6050.h"
#include "tm_stm32f4_adc.h"
#include "tm_stm32f4_usart.h"
#include "tm_stm32f4_gps.h"
#include "tm_stm32f4_disco.h"

/* Exported types ------------------------------------------------------------*/
/* Exported constants --------------------------------------------------------*/
/* Exported macro ------------------------------------------------------------*/
typedef enum {
  
  INITIALIZATION, RUNNING, SLEEP
}STATE;


/* Exported functions ------------------------------------------------------- */

#endif /* __MAIN_H */

/************************ (C) COPYRIGHT STMicroelectronics *****END OF FILE****/
