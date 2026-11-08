/* Includes ------------------------------------------------------------------*/
#include "main.h"


/* Private typedef -----------------------------------------------------------*/
/* Private define ------------------------------------------------------------*/
/* Private macro -------------------------------------------------------------*/
/* Private variables ---------------------------------------------------------*/
/* Private function prototypes -----------------------------------------------*/
void initialization(void);
/* Private functions ---------------------------------------------------------*/

void initialization(void){
    /// System Initialized 
    SystemInit();
    
    ///Init ILI9341 with LTDC on STM32F429 Discovery board
    TM_ILI9341_Init();
    TM_ILI9341_Rotate(TM_ILI9341_Orientation_Portrait_2);
    ///Initialize delay
    TM_DELAY_Init();
    
    
    /// Initialized ADC for Primary Battery
    TM_ADC_Init(ADC1, ADC_Channel_11);
    
    /// Initialized ADC for Backup Battery
    TM_ADC_Init(ADC1, ADC_Channel_2);

    TM_USART_Init(USART1, TM_USART_PinsPack_2, 115200);
    
}


  int main(void)
{ 
    initialization();
    char buffer[30];
    char clearbuffer[1];
    char str[120];
    TM_GPS_Data_t GPS_Data;
    TM_GPS_Result_t result, current;
    TM_GPS_Float_t GPS_Float;
    TM_GPS_Distance_t GPS_Distance;
    

    //if (TM_MPU6050_Init(&MPU6050_Data0, TM_MPU6050_Device_0, TM_MPU6050_Accelerometer_8G, TM_MPU6050_Gyroscope_250s) == TM_MPU6050_Result_Ok) {
    
    //  TM_ILI9341_Fill(ILI9341_COLOR_WHITE);
    //  TM_ILI9341_Puts(10, 10, "MPU6050 Initialized", &TM_Font_11x18, 0x0000, ILI9341_COLOR_RED);
    //  TM_ILI9341_Puts(10, 32, "Successfully !!!", &TM_Font_11x18, 0x0000, ILI9341_COLOR_RED);
    /// Initialization of GPS 
    TM_GPS_Init(&GPS_Data, 115200);
    
    /// Initialize the MPU6050
    TM_MPU6050_t MPU6050_Data0;
    TM_MPU6050_Init(&MPU6050_Data0, TM_MPU6050_Device_0, TM_MPU6050_Accelerometer_2G, TM_MPU6050_Gyroscope_250s);
    TM_ILI9341_Fill(0x87f9);
    
    while (1) {
        /* Read data */
        //TM_L3GD20_Read(&L3GD20_Data);
        TM_MPU6050_ReadAll(&MPU6050_Data0);
        /* Display data on LCD */
       
 
        sprintf(buffer, "Int. Temp:  %d \n\r", TM_ADC_Read(ADC1, ADC_Channel_16));
        TM_ILI9341_Puts(10, 54, buffer, &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);
        
        TM_ILI9341_Puts(10, 100,clearbuffer,  &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);
        sprintf(buffer, "X direction: %4d", MPU6050_Data0.Accelerometer_X);
        TM_ILI9341_Puts(10, 100, buffer, &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);

        sprintf(buffer, "Y direction: %4d", MPU6050_Data0.Accelerometer_Y);
        TM_ILI9341_Puts(10, 122, buffer, &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);
        sprintf(buffer, "Z direction: %4d",(uint16_t) MPU6050_Data0.Accelerometer_Z);
        TM_ILI9341_Puts(10, 144, buffer, &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);
        sprintf(buffer, "X rotation: %4d", (uint16_t) MPU6050_Data0.Gyroscope_X);
        TM_ILI9341_Puts(10, 166, buffer, &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);
        sprintf(buffer, "Y rotation: %4d", (uint16_t) MPU6050_Data0.Gyroscope_Y);
        TM_ILI9341_Puts(10, 188, buffer, &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);
        sprintf(buffer, "Z rotation: %4d", (uint16_t) MPU6050_Data0.Gyroscope_Z);
        TM_ILI9341_Puts(10, 210, buffer, &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);
        sprintf(buffer, "Temperature: %4d",(uint16_t) MPU6050_Data0.Temperature);
        TM_ILI9341_Puts(10, 232, buffer, &TM_Font_11x18, ILI9341_COLOR_WHITE, ILI9341_COLOR_RED);   
    
    }
    
    
    STATE currentStatus = INITIALIZATION;


    while(1) {
        switch(currentStatus) {
            case INITIALIZATION:
                // Code for initialization state
                printf("State: INITIALIZATION\n");
                // Example transition to RUNNING state
                currentStatus = RUNNING;
                break;

            case RUNNING:
                // Code for running state
                printf("State: RUNNING\n");
                // Example transition to SLEEP state
                currentStatus = SLEEP;
                break;

            case SLEEP:
                // Code for sleep state
                printf("State: SLEEP\n");
                // Example transition to INITIALIZATION state
                currentStatus = INITIALIZATION;
                break;

            default:
                // Optional: Handle unexpected states
                break;
        }
}


}


